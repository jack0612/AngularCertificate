import { Injectable } from '@angular/core';
import { WeatherService } from "./weather.service";
import { ILocation } from './models/location.model';
import { Country } from './models/country.model';

let LOCATIONS: string = "locations_594944050"; // in case to conflict with other's app


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations: ILocation[] = [];


  constructor(private weatherService: WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) {
      this.locations = JSON.parse(locString);
    }
    for (let loc of this.locations) {
      this.weatherService.addCurrentConditions(loc.country, loc.zipcode);
    }
  }

  addLocation(country: Country, zipcode: string) {
    this.locations.push({ country, zipcode });
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(country, zipcode);
  }


  getRefreshedWeather() {
    (this.locations).forEach(location => {
      this.weatherService.getRefreshedWeather(location.country, location.zipcode)
    });
  }

  removeLocation(country: Country, zipcode: string) {
    this.locations = this.locations.filter(loc => !(loc.country.id == country.id && loc.zipcode == zipcode))
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.removeCurrentConditions(country, zipcode);
  }
}
