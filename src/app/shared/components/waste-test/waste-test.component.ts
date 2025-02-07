import { Component, EventEmitter, inject, Input, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { WasteItem, WasteType } from '../../../core/models/Collection.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waste-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './waste-test.component.html',
  styleUrl: './waste-test.component.css'
})
export class WasteTestComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);

  @Input() wasteItems: WasteItem[] = []; // Receive waste items array from parent
  @Output() wasteItemsChange = new EventEmitter<WasteItem[]>(); // Emit updated waste items to parent

  wasteTypes = Object.values(WasteType);
  private wasteItemsArray!: FormArray; // Use a private variable for FormArray

  constructor() {
    // Initialize an empty FormArray in the constructor
    this.wasteItemsArray = this.fb.array([]);
  }

  ngOnInit() {
    // Ensure that wasteItems are available before initializing the FormArray
    this.updateWasteItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['wasteItems']) {
      this.updateWasteItems();
    }
  }

  private updateWasteItems() {
    // Reinitialize the FormArray with the latest waste items
    this.wasteItemsArray.clear();
    this.wasteItems.forEach((item) => {
      this.wasteItemsArray.push(this.createWasteItemForm(item));
    });

    // Emit changes so parent receives initial data
    this.emitChanges();
  }

  private createWasteItemForm(item?: WasteItem): FormGroup {
    return this.fb.group({
      type: [item?.type || WasteType.PLASTIC, Validators.required],
      weight: [item?.weight || 1000, [Validators.required, Validators.min(1000)]],
    });
  }

  addWasteItem() {
    if (!this.wasteItemsArray) {
      console.error('wasteItemsFormArray is undefined!');
      return;
    }
    this.wasteItemsArray.push(this.createWasteItemForm());
    this.emitChanges();
  }

  removeWasteItem(index: number) {
    if (this.wasteItemsArray.length > 1) {
      this.wasteItemsArray.removeAt(index);
      this.emitChanges();
    }
  }

  emitChanges() {
    this.wasteItemsChange.emit(this.wasteItemsArray.value);
  }

  get wasteItemsFormArray(): FormArray {
    return this.wasteItemsArray;
  }

  // Helper function to safely cast AbstractControl to FormGroup
  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
