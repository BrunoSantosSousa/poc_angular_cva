import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  group: FormGroup;

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({
      dataInicio: ['0524', Validators.required],
    });
  }

  get formControlData(): FormControl {
    return this.group.get('dataInicio') as FormControl;
  }
}
