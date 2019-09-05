import { Component, OnInit } from '@angular/core';
import { Observable, Observer, from, of, interval, timer, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

  // Ao adicionar vários subscribes a um Subscription,
  // é possível dar unsubscribe em todos os susbscribes de uma única vez
  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
  }

  observableCreate() {
    const hello = Observable.create((observer: Observer<string>) => {
      observer.next('Hello');
      observer.next('from');
      observer.next('observable');
      observer.complete();
    });
    hello.subscribe(valor => console.log(valor));
  }

  fromClick() {
    from([1, 2, 3, 4, 5, { x: 10, y: 20 }]).subscribe((value) => { console.log(value); });
    const source = from([1, 2, 3, 4, 5, { x: 10, y: 20 }]);
    const subscription = source.subscribe((value) => { console.error(value); });
    this.subscription.add(subscription);
  }

  ofClick() {
    of([1, 2, 3, 4, 5, { x: 10, y: 20 }]).subscribe((value) => { console.log(value); });
  }

  intervalClick() {
    const source = interval(1000);
    const subscription = source.subscribe((value) => { console.log(value); });
    this.subscription.add(subscription);
  }

  timerClick() {
    // const source = timer(1000);
    const source = timer(3000, 1000);
    const subscription = source.subscribe((value) => { console.log(value); });
    this.subscription.add(subscription);
  }

  fromEventClick() {
    const source = fromEvent(document, 'click');
    const subscription = source.subscribe((event) => { console.log(event); });
    this.subscription.add(subscription);
  }

  unsubscribeClick() {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
  }

}
