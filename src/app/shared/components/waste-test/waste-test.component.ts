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
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class WasteTestComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() wasteItems: WasteItem[] = [];
  @Output() wasteItemsChange = new EventEmitter<WasteItem[]>();

  wasteTypes = Object.values(WasteType);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      items: this.fb.array([])
    });

    // Listen to form changes
    this.form.get('items')?.valueChanges.subscribe(values => {
      this.wasteItemsChange.emit(values);
    });
  }

  ngOnInit() {
    if (this.wasteItems.length === 0) {
      this.addWasteItem();
    } else {
      this.wasteItems.forEach(item => this.addWasteItem(item));
    }
  }

  private createWasteItemForm(item?: WasteItem): FormGroup {
    return this.fb.group({
      type: [item?.type || WasteType.PLASTIC, Validators.required],
      weight: [item?.weight || 1, [Validators.required, Validators.min(1)]]
    });
  }

  addWasteItem(item?: WasteItem) {
    const itemsArray = this.form.get('items') as FormArray;
    itemsArray.push(this.createWasteItemForm(item));
  }

  removeWasteItem(index: number) {
    const itemsArray = this.form.get('items') as FormArray;
    if (itemsArray.length > 1) {
      itemsArray.removeAt(index);
    }
  }

  get itemsFormArray() {
    return this.form.get('items') as FormArray;
  }
}
