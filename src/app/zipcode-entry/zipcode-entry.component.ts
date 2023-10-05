import { Component } from '@angular/core';
import { LocationService } from "../location.service";
import { WeatherService } from '../weather.service';
import { AppUtil } from '../utils/app-util';
import { State } from '../state-button/state-button.component';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']

})
export class ZipcodeEntryComponent {

  action$ = this.weatherService.getWeatherReceived();
  constructor(private service: LocationService, private weatherService: WeatherService) { }
  private country:Country = null;
  state: State = 'initial';
  zipcode: string;

  addLocation(zipcode: string) {
    if (!AppUtil.isEmpty(this.country) && !AppUtil.isEmpty(zipcode)) {
      this.service.addLocation(this.country, zipcode);
    }
  }

  onChangeCountry(country: Country) {
    this.country = country;
  }


  onChangeState(state: State) {
    this.state = state;
  }

 

}
