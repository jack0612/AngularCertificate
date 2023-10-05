import { Component, inject, Signal } from '@angular/core';
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { ConditionsAndZip } from '../models/conditions-and-zip.type';
import { interval } from 'rxjs';
import { SubSink } from 'app/utils/subsink';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {


  private weatherService = inject(WeatherService);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();
  private subs = new SubSink();


  ngOnInit() {
    this.subs.sink = interval(30000)  
      .subscribe(() => {
        this.locationService.getRefreshedWeather();
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}




