import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true,
    },
  ],
})
export class TimepickerComponent implements OnInit, ControlValueAccessor {
  value!: string;
  onChange!: (value: string) => void;
  formGroup!: FormGroup;

  horaControl!: FormControl;
  minutoControl!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({
      hora: [],
      minuto: [],
    });

    this.horaControl = this.formGroup.get('hora') as FormControl;
    this.minutoControl = this.formGroup.get('minuto') as FormControl;
  }

  ngOnInit(): void {}

  writeValue(obj: string): void {
    if (obj.length !== 4) {
      return;
    }
    this.horaControl.setValue(obj.substr(0, 2));
    this.minutoControl.setValue(obj.substr(2, 3));
  }

  registerOnChange(onChange: any): void {
    this.formGroup.valueChanges.subscribe((values) => {
      onChange(`${values.hora}${values.minuto}`);
    });
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
}
