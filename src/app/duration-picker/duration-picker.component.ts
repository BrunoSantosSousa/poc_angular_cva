import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface LocalTempo {
  hora: string;
  minutos: string;
}

@Component({
  selector: 'app-duration-picker',
  templateUrl: './duration-picker.component.html',
  styleUrls: ['./duration-picker.component.scss'],
})
export class DurationPickerComponent implements OnInit {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  constructor() {}

  duracaoEvento!: string;

  get valor(): string {
    return this.inputRef.nativeElement.value;
  }

  ngOnInit(): void {}

  onKeyup($event: KeyboardEvent) {
    console.log($event);
    console.log(this.inputRef.nativeElement.value);

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
    this.inputRef.nativeElement.value = value;
  }

  handleBlur() {
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
    if (hora.length !== 2 && +hora <= 9) {
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
