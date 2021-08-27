import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  isTime(control: FormGroup | AbstractControl | FormControl) {
    if (control.value) {
      console.log('control dentro do istime', control);
      if (control.value.length === 4) {
        const hours = +control.value.substring(0, 2);
        const minutes = +control.value.substring(2, 4);

        console.log('hours', hours);
        console.log('minutes', minutes);

        if (
          hours !== hours ||
          minutes !== minutes ||
          hours < 0 ||
          hours > 23 ||
          minutes < 0 ||
          minutes > 59
        ) {
          return { nonTime: true };
        }
        return null;
      } else {
        return { nonTime: true };
      }
    }
    console.log('caindo fora');
    return { nonTime: true };
  }
}
