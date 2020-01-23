import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit, OnDestroy {

  protected subscriptionsAreActive = false;
  private subscriptions: Subscription[] = [];
  private unsubscribeAll$: Subject<any> = new Subject<any>();
  private intervalIdSubscription: Subscription = null;

  constructor() { }

  ngOnInit() {
    this.checkSubscription();
  }

  checkSubscription() {
    this.intervalIdSubscription = interval(100).subscribe(() => {
      let active = false;
      this.subscriptions.forEach((subscribe) => {
        if (!subscribe.closed) {
          active = true;
        }
      });
      this.subscriptionsAreActive = active;
    });
  }

  subscribe() {
    const subscription1 = interval(100)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(i => console.log(`Interval ${i}`));

    const subscription2 = fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((event: MouseEvent) => console.log('Mouse Event', event));

    this.subscriptions.push(subscription1, subscription2);
  }

  unsubscribe() {
    this.unsubscribeAll$.next();
    if (this.intervalIdSubscription != null) {
      this.intervalIdSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
