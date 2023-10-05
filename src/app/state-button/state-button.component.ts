import { Component, HostListener, Input } from '@angular/core';
import { AppUtil } from 'app/utils/app-util';
import { Observable, timer } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export type State = 'initial' | 'working' | 'done';

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.css']
})
export class StateButtonComponent<T> {

  @Input()
  action: Observable<T>;

  state: State = 'initial';

  @HostListener('click')
  triggerAction() {
    this.state = 'working';
    const stateChangeObs = this.action
      .pipe(
        delay(2000),  //delay 2s here to make the ...Adding button displayed to demo
        tap((addedLocationWeatherReceived) => {
          if (addedLocationWeatherReceived) {
            this.state = 'done';
            const timerObs = timer(1000).pipe(tap(() => this.state = 'initial'));//for add next location 
            AppUtil.runObservableOnlyOneTime(timerObs); //to free the memeory as soon as possible
          }
        })
      );
    AppUtil.runObservableOnlyOneTime(stateChangeObs); //to free the memeory as soon as possible
  }

}

