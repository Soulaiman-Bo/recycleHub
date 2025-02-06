import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Collection, CollectionStatus, WasteType } from '../../../core/models/Collection.model';
import { selectUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-pickup-request-dialog',
  standalone: true,
  templateUrl: './pickup-request-dialog.component.html',
  styleUrls: ['./pickup-request-dialog.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
})
export class PickupRequestDialogComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  userId = signal<string | null>(null);

  wasteTypes = Object.values(WasteType);
  form: FormGroup;
  uploadedPhotos: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<PickupRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.store.select(selectUser).subscribe(user => {
      if (user?.id) this.userId.set(user.id); // Ensure user.id is not undefined
    });

    this.form = this.fb.group({
      wasteItems: this.fb.array([]), // Multiple waste items
      address: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: [''],
      status: [CollectionStatus.PENDING]
    });

    this.addWasteItem(); // Initialize with one waste item
  }

  get wasteItems(): FormArray {
    return this.form.get('wasteItems') as FormArray;
  }

  addWasteItem() {
    this.wasteItems.push(
      this.fb.group({
        type: [this.wasteTypes[0], Validators.required],
        weight: [1000, [Validators.required, Validators.min(1000)]],
      })
    );
  }

  removeWasteItem(index: number) {
    if (this.wasteItems.length > 1) {
      this.wasteItems.removeAt(index);
    }
  }

  handleFileUpload(event: any) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedPhotos.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (!this.userId()) return;

    const formData: Collection[] = this.wasteItems.value.map((item: any) => ({
      id: Date.now(),
      userId: this.userId()!,
      photos: this.uploadedPhotos,
      address: this.form.value.address,
      date: this.form.value.date,
      timeSlot: this.form.value.timeSlot,
      notes: this.form.value.notes,
      status: CollectionStatus.PENDING,
      weight: item.weight,
      type: item.type,
    }));

    this.dialogRef.close(formData);
  }
}
