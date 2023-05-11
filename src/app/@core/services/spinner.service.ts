import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count = 0;
  public spinner$ = new BehaviorSubject<string>('');
  private interval: any;
  private timeLeft: any;

  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  startSpinner() {
    if (++this.count === 1) {
      this.spinner$.next('start');

      // set default 10s if spinner waiting too long then turn it off
      this.timeLeft = 30; // 30 seconds waiting
      clearInterval(this.interval); // clear Interval for reset counting to 1000 every time triggering this func
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.stopSpinner();
        }
      }, 1000);

    }
  }

  stopSpinner() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
    }
  }

  recallSpiner() {
    this.count = 0;
    this.spinner$.next('stop');
  }

}
