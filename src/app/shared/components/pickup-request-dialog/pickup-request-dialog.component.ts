import { Component, HostListener, Inject, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  Collection,
  CollectionStatus,
  WasteItem,
  WasteType,
} from '../../../core/models/Collection.model';
import { selectUser } from '../../../store/auth/auth.selectors';
import { WasteTestComponent } from '../waste-test/waste-test.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import {
  createCollection,
  updateCollection,
} from '../../../store/collection/collections.actions';
import { map, Observable, take } from 'rxjs';
import { selectCollectionsForCurrentUser } from '../../../store/collection/collections.selectors';

@Component({
  selector: 'app-pickup-request-dialog',
  standalone: true,
  templateUrl: './pickup-request-dialog.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    WasteTestComponent,
    FileUploadComponent,
  ],
})
export class PickupRequestDialogComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  userId = signal<string | null>(null);

  timeSlots: string[] = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
  ];

  wasteItems: WasteItem[] = [{ type: WasteType.PLASTIC, weight: 10 }];
  form!: FormGroup;
  uploadedPhotos: string[] = [];

  collections$: Observable<Collection[]> = this.store.select(
    selectCollectionsForCurrentUser
  );

  pendingCollectionsCount$: Observable<number> = this.collections$.pipe(
    map(
      (collections) =>
        collections.filter(
          (collection) => collection.status === CollectionStatus.PENDING
        ).length
    )
  );

  constructor(
    public dialogRef: MatDialogRef<PickupRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { collection?: Collection }
  ) {
    // Subscribe to the current user ID
    this.store.select(selectUser).subscribe((user) => {
      if (user?.id) this.userId.set(user.id);
    });

    this.initializeForm();

    // If we have a collection passed in data, we're in 'edit' mode
    if (this.data?.collection) {
      this.loadCollectionData(this.data.collection);
    }
  }

  private loadCollectionData(existing: Collection) {
    this.form.patchValue({
      address: existing.address,
      city: existing.city,
      date: existing.date,
      timeSlot: existing.timeSlot,
      notes: existing.notes,
      status: existing.status,
    });
    this.wasteItems = [...existing.wasteItems];
    this.uploadedPhotos = [...existing.photos];
  }

  private initializeForm() {
    this.form = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: [''],
      status: [CollectionStatus.PENDING],
    });
  }

  updateWasteItems(updatedWasteItems: WasteItem[]) {
    this.wasteItems = updatedWasteItems;
  }

  onFileUploaded(base64String: string) {
    this.uploadedPhotos.push(base64String);
  }

  onFileRemoved(index: number) {
    this.uploadedPhotos.splice(index, 1);
  }

  submitForm() {
    if (!this.userId()) return;

    // Check if the user has 3 pending collections
    this.pendingCollectionsCount$.pipe(take(1)).subscribe((pendingCount) => {
      if (pendingCount >= 3) {
        alert('You cannot create more than 3 pending collections.');
        return;
      }

      // Build the form data
      const formData: Collection = {
        ...this.data?.collection, // preserve existing ID if editing
        userId: this.userId()!, // override userId
        wasteItems: this.wasteItems,
        photos: this.uploadedPhotos,
        address: this.form.value.address,
        city: this.form.value.city,
        date: this.form.value.date,
        timeSlot: this.form.value.timeSlot,
        notes: this.form.value.notes,
        status: this.form.value.status,
        collectorId: '',
      };

      if (!this.data?.collection?.id) {
        delete formData.id;
      }

      // If editing, dispatch update
      if (this.data?.collection) {
        this.store.dispatch(updateCollection({ collection: formData }));
      } else {
        // Else, create a new collection
        this.store.dispatch(createCollection({ collection: formData }));
      }

      this.dialogRef.close();
    });
  }
}
