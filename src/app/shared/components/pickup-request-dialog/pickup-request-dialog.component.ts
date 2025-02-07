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
import { createCollection } from '../../../store/collection/collections.actions';

@Component({
  selector: 'app-pickup-request-dialog',
  standalone: true,
  templateUrl: './pickup-request-dialog.component.html',
  styleUrls: ['./pickup-request-dialog.component.css'],
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

  constructor(
    public dialogRef: MatDialogRef<PickupRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.store.select(selectUser).subscribe((user) => {
      if (user?.id) this.userId.set(user.id);
    });

    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      address: ['', Validators.required],
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

    const formData: Collection = {
      id: Date.now(),
      userId: this.userId()!,
      wasteItems: this.wasteItems, // Updated waste items
      photos: this.uploadedPhotos,
      address: this.form.value.address,
      date: this.form.value.date,
      timeSlot: this.form.value.timeSlot,
      notes: this.form.value.notes,
      status: CollectionStatus.PENDING,
    };

    this.store.dispatch(createCollection({ collection: formData }));


    this.dialogRef.close([formData]);
  }
}
