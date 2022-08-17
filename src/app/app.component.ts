import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate(
    '0.3s ease-in',
    style({
      opacity: 1,
    })
  ),
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate(
    '0.3s ease-out',
    style({
      opacity: 0,
    })
  ),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

const fadeOut = trigger('fadeOut', [leaveTrans]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeIn, fadeOut],
})
export class AppComponent implements OnInit {
  roman: string = '';
  romanControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$'
    ),
  ]);
  showAlert: boolean = false;
  decimal: number = 0;
  historial: Array<{ roman: string; decimal: number }> = [];
  ngOnInit(): void {}
  convert() {
    let literals: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };
    if (this.romanControl.valid) {
      this.roman = this.romanControl.value as string;
      this.decimal = 0;
      for (let i = 0; i < this.roman.length; i++) {
        if (literals[this.roman[i]] < literals[this.roman[i + 1]]) {
          this.decimal -= literals[this.roman[i]];
        } else {
          this.decimal += literals[this.roman[i]];
        }
      }
      this.romanControl.reset('');
      this.historial = [
        { roman: this.roman, decimal: this.decimal },
        ...this.historial,
      ];
      this.showAlert = true;
    }
  }
}
