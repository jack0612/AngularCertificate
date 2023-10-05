import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, countries } from '../models/country.model';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.component.html',
  styleUrls: ['./country-selection.component.css']
})
export class CountrySelectionComponent {
  @Output() changeCountry = new EventEmitter<Country>();

  countries$: Observable<Country[]>;
  countryControl = new FormControl('');

  constructor() {
    this.countries$ = this.countryControl.valueChanges.pipe(
      map((userInput) => countries.filter(c => c.description.toLowerCase().indexOf(userInput.toLowerCase()) !== -1))
    );
  }

  updateCountry(country: Country) {
    this.countryControl.setValue(country.description);
    this.changeCountry.emit(country);
  }
}
