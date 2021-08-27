import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { UtilsService } from '../utils.service';

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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true,
    },
  ],
})
export class TimepickerComponent
  implements OnInit, ControlValueAccessor, Validator
{
  onChange!: (value: string) => void;

  onTouch!: (value: boolean) => void;

  formGroup!: FormGroup;

  horaControl!: FormControl;
  minutoControl!: FormControl;

  @Input('formControl')
  control!: FormControl;

  constructor(
    private readonly fb: FormBuilder,
    private readonly utils: UtilsService
  ) {}

  ngOnInit(): void {
    const validators = this.montarValidator(
      this.control.hasValidator(Validators.required)
    );

    this.formGroup = this.fb.group({
      hora: [null, validators],
      minuto: [null, validators],
    });

    this.horaControl = this.formGroup.get('hora') as FormControl;
    this.minutoControl = this.formGroup.get('minuto') as FormControl;

    if (this.control.touched) {
      this.formGroup.markAllAsTouched();
    }
  }

  writeValue(obj: string): void {
    if (obj.length !== 4) {
      return;
    }
    this.horaControl.setValue(+obj.substr(0, 2) || null);
    this.minutoControl.setValue(+obj.substr(2, 3) || null);
  }

  registerOnChange(onChange: any): void {
    this.formGroup.valueChanges.subscribe((values) => {
      onChange(`${values.hora || ''}${values.minuto || ''}`);
    });
  }

  private montarValidator(required: boolean): Validators[] {
    const validators = [];
    if (required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  private normalizarHora(hora: string): string {
    if (hora?.length === 1) {
      return `0${hora}`;
    }

    return hora;
  }

  private normalizarMinuto(minuto: string) {
    if (minuto?.length === 1) {
      if (+minuto <= 5) {
        return `${minuto}0`;
      }

      return `0${minuto}`;
    }

    return minuto;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  handleBlur() {
    const hora = this.normalizarHora(this.horaControl.value);
    const minutos = this.normalizarMinuto(this.minutoControl.value);

    this.horaControl.setValue(hora);
    if(minutos && !hora) {
      this.horaControl.setErrors({ nonTime: true });
    } 

    this.minutoControl.setValue(minutos);
    if(hora && !minutos) {
      this.minutoControl.setErrors({ nonTime: true });
    } 

    this.onTouch(true);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.hasValidator(Validators.required)) {
      const validacao = this.utils.isTime(control) || null;
      return validacao;
    }

    const hasErrors = control.value?.length !== 4 && control.value !== null;

    console.log('hasErrors', hasErrors);
    console.log('control value', control.value);
    return hasErrors ? { nonTime: true } : null;
  }
}
