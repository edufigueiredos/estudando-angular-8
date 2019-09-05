import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { from, fromEvent, interval, Subscription, Observable, Subject, timer } from 'rxjs';
import { map, delay, filter, tap, take, first, last, debounce, debounceTime, takeWhile, takeUntil } from 'rxjs/operators';
import { MatRipple } from '@angular/material';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  searchEntry$: Subject<string> = new Subject<string>();
  protected searchInput = '';

  @ViewChild(MatRipple, { static: false }) ripple: MatRipple;

  constructor() { }

  ngOnInit() {
  }

  mapClick() {
    const mapWithDelay = from([1, 2, 3, 4, 5, 7]).pipe(
      map(value => value * 2),
      map(value => value * 10),
      delay(1000)
    ).subscribe(numberValue => console.log(numberValue));

    const mapEventMouse = fromEvent(document, 'click').pipe(
      map((event: MouseEvent) => ({ x: event.screenX, y: event.screenY }))
    ).subscribe(position => console.log(position));

    this.subscription.add(mapWithDelay);
    this.subscription.add(mapEventMouse);
  }

  filterClick() {
    const filterEvenNumbers = from([1, 2, 3, 4, 5, 7]).pipe(
      filter(value => value % 2 === 1)
    ).subscribe(numberValue => console.log(numberValue));

    const filterWithDelay = interval(1000).pipe(
      filter(value => value % 2 === 0),
      map(value => `Value: ${value}`),
      delay(1000)
    ).subscribe(value => console.log(value));

    this.subscription.add(filterEvenNumbers);
    this.subscription.add(filterWithDelay);
  }

  tapClick() {
    const tapWithDelay = interval(1000).pipe(
      tap(value => console.warn(`Before filter: ${value}`)),
      filter(value => value % 2 === 0),
      tap(value => console.warn(`After filter: ${value}`)),
      map(value => `Value: ${value}`),
      tap(value => console.warn(`After map: ${value}`)),
    ).subscribe(value => console.log(value));

    this.subscription.add(tapWithDelay);
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for (i = 0; i < 20; i++) {
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      }
      setTimeout(() => observer.complete(), i * 100);
    });

    const subscription = observable
      .pipe(
        tap(value => console.log(`Tap: ${value}`)),
        // take(10)
        // first()
        last()
      )
      .subscribe(value => console.log(`Output: ${value}`),
        (error) => console.log(error),
        () => console.log(('Complete!')));

    const intervalCheck = setInterval(() => {
      console.log('Checking...');
      if (subscription.closed) {
        console.warn('Subscription CLOSED!');
        clearInterval(intervalCheck);
      }
    }, 200);

    this.subscription.add(subscription);
  }

  debounceTimeClick() {
    const debounceTimeSub = fromEvent(document, 'click')
      .pipe(
        debounceTime(1000)
      )
      .subscribe((event: MouseEvent) => {
        this.launchRipple();
      });

    this.subscription.add(debounceTimeSub);
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true
    });
    rippleRef.fadeOut();
  }

  searchBy(event) {
    this.searchEntry$.next(this.searchInput);
  }

  debounceTimeSearch() {
    this.searchEntry$
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => console.log(value));

    this.subscription.add(this.searchEntry$);
  }

  takeWhile() {
    const takeWhileSubs = interval(500)
      .pipe(
        takeWhile((value, index) => (value < 5))
      )
      .subscribe(
        value => console.log(`Take While: ${value}`),
        (error) => console.log(error),
        () => console.log('Completed!')
      );

    this.subscription.add(takeWhileSubs);
  }

  takeUntil() {
    const dueTime$ = timer(5000);

    const takeWhileSubs = interval(1000)
      .pipe(
        takeUntil(dueTime$)
      )
      .subscribe(
        value => console.log(`Take While: ${value}`),
        (error) => console.log(error),
        () => console.log('Completed!')
      );

    this.subscription.add(takeWhileSubs);
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
