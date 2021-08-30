import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

interface LocalTempo {
  hora: string;
  minutos: string;
}

@Component({
  selector: 'app-duration-picker',
  templateUrl: './duration-picker.component.html',
  styleUrls: ['./duration-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationPickerComponent),
      multi: true,
    },
  ],
})
export class DurationPickerComponent implements ControlValueAccessor {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  @Input('formControl') control!: FormControl;

  onChange!: (value: string) => void;
  onTouch!: (value: boolean) => void;

  temporario?: string;

  private _valor!: string;

  get valor(): string {
    return this._valor;
  }

  set valor(novoValor) {
    this._valor = novoValor;
  }

  constructor() {}

  writeValue(valor: string): void {
    const novoValor = this.aplicaMascara(valor);
    this.valor = novoValor;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onKeyup($event: KeyboardEvent) {
    this.atualizaValorInput(
      this.aplicaMascara(this.inputRef.nativeElement.value)
    );
  }

  aplicaMascara(value: string) {
    value = value.replace(/\D/g, '');

    if (value.length <= 4) {
      return value.replace(/(\d{1,2})(\d{1,2})/, '$1:$2');
    }

    return value.replace(/(\d{1,3})(\d{1,2})/, '$1:$2');
  }

  atualizaValorInput(value: string) {
    this.valor = value;
    this.onChange(this.sanitizarSaida(this.valor));
  }

  sanitizarSaida(valor: string): string {
    return valor.replace(/\D/g, '');
  }

  onBlur() {
    this.onTouch(true);

    if (!this.valor?.length) {
      return;
    }

    const split = this.valor.split(':');

    const tempo = {
      hora: split[0],
      minutos: split[1] || '00',
    };

    if (+tempo.hora < 999) {
      this.aplicarConversaoMinutoParaHora(tempo);
    }

    const horaNormalizada = this.normalizaHora(tempo.hora);
    const minutosNormalizados = this.normalizaMinutos(tempo.minutos);

    this.atualizaValorInput(`${horaNormalizada}:${minutosNormalizados}`);
  }

  aplicarConversaoMinutoParaHora(tempo: LocalTempo) {
    const novoTempo = this.converteMinutoParaHora(tempo.minutos);
    if (+novoTempo.hora > 0) {
      tempo.hora = (parseInt(novoTempo.hora) + parseInt(tempo.hora)).toString();
      tempo.minutos = novoTempo.minutos;
    }
  }

  normalizaHora(hora: string): string {
    if (hora.length === 1 && +hora <= 9) {
      return `0${hora}`;
    }
    return `${hora}`;
  }

  normalizaMinutos(minutos: string): string {
    if (minutos.length !== 2 && +minutos < 6) {
      return `${minutos}0`;
    } else if (minutos.length !== 2 && +minutos <= 9) {
      return `0${minutos}`;
    }
    return `${minutos}`;
  }

  converteMinutoParaHora(minutos: string): LocalTempo {
    const tempo = {
      hora: '00',
      minutos: '00',
    };

    if (+minutos < 60) {
      tempo.minutos = minutos;

      return tempo;
    }

    tempo.hora = '1';
    tempo.minutos = `${+minutos - 60}`;

    return tempo;
  }
}
