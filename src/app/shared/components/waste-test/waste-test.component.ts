import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { WasteItem, WasteType } from '../../../core/models/Collection.model';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';

import {
  heroTrash,
  heroPlus,
  heroScale,
  heroXCircle,
  heroExclamationCircle,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-waste-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  templateUrl: './waste-test.component.html',
  viewProviders: [
    provideIcons({
      heroTrash,
      heroPlus,
      heroScale,
      heroXCircle,
      heroExclamationCircle,
    }),
  ],
  styleUrl: './waste-test.component.css',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class WasteTestComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);

  @Input() wasteItems: WasteItem[] = [];
  @Output() wasteItemsChange = new EventEmitter<WasteItem[]>();

  wasteTypes = Object.values(WasteType);
  wasteItemsArray: FormArray;

  constructor() {
    this.wasteItemsArray = this.fb.array([]);
  }

  ngOnInit() {
    this.updateWasteItems();
    // Subscribe to value changes to ensure form updates are emitted
    this.wasteItemsArray.valueChanges.subscribe(() => {
      this.emitChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['wasteItems']) {
      this.updateWasteItems();
    }
  }

  private updateWasteItems() {
    this.wasteItemsArray.clear();
    if (this.wasteItems.length === 0) {
      this.addWasteItem();
    } else {
      this.wasteItems.forEach((item) => {
        this.wasteItemsArray.push(this.createWasteItemForm(item));
      });
    }
  }

  private createWasteItemForm(item?: WasteItem): FormGroup {
    return this.fb.group({
      type: [item?.type || WasteType.PLASTIC, Validators.required],
      weight: [
        item?.weight || 1,
        [Validators.required, Validators.min(1)]
      ],
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
    const formValue = this.wasteItemsArray.value;
    this.wasteItemsChange.emit(formValue);
  }

  get wasteItemsFormArray(): FormArray {
    return this.wasteItemsArray;
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
