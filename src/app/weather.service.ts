import { Injectable, Signal, signal } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CurrentConditions } from './current-conditions/current-conditions.type';
import { ConditionsAndZip } from './models/conditions-and-zip.type';
import { Country } from './models/country.model';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = signal<ConditionsAndZip[]>([]);

  private weatherReceivedSubject: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  getWeatherReceived() {
    return this.weatherReceivedSubject.asObservable();
  }

  addCurrentConditions(country: Country, zipcode: string): void {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},${country.id}&units=imperial&APPID=${WeatherService.APPID}`)
      .subscribe(data => {
        this.weatherReceivedSubject.next(true);
        return this.currentConditions.mutate(conditions => conditions.push({ country, zip: zipcode, data }))
      });
  }

  times = 1;
  getRefreshedWeather(country: Country, zipcode: string) {
    this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},${country.id}&units=imperial&APPID=${WeatherService.APPID}`)
      .subscribe(data => {
        data.main.temp_max = data.main.temp_max + this.times++; //just to demo that the max temp changes
        this.currentConditions.mutate(conditions => {
          (conditions || []).forEach(c => {
            if (c.country.id == country.id && c.zip == zipcode) {
              c.data = data;
            }
          });
        });
      });
  }

  removeCurrentConditions(country: Country, zipcode: string) {
    this.currentConditions.mutate(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode && conditions[i].country.id == country.id)
          conditions.splice(+i, 1);
      }
    })
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }


  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
