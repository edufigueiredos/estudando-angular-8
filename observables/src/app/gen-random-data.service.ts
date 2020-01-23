import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, Observer } from 'rxjs';
import { DataModel } from './data-model.model';
import { publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenRandomDataService {

  public dataObservable: ConnectableObservable<DataModel>;
  constructor() {
    this.dataObservable = new Observable(
      (observer: Observer<DataModel>) => {
        let numberObservable = 0;
        console.log('Observable created');
        const dataFunction = () => {
          numberObservable++;
          console.log(numberObservable);
          if (numberObservable <= 10) {
            const timestamp = Math.round(Math.random() * 2000 + 500);
            observer.next({timestamp, data: numberObservable});
            setTimeout(dataFunction, timestamp);
          } else {
            observer.complete();
          }
        };
        dataFunction();
      }
    ).pipe(publish()) as ConnectableObservable<DataModel>;
  }
}
