import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { DurationPickerComponent } from './duration-picker/duration-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    TimepickerComponent,
    DurationPickerComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
