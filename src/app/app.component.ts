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
      hora: ['1240', Validators.required],
      duracao: ['00000', Validators.required]
    });

    //this.group.markAllAsTouched();
  }

  get horaControl(): FormControl {
    return this.group.get('dataInicio') as FormControl;
  }

  get duracaoControl(): FormControl {
    return this.group.get('duracao') as FormControl;
  }
}
