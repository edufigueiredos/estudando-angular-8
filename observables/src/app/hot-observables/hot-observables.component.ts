import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';

import { publish, refCount, share } from 'rxjs/operators';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  n = 0;
  n1 = 0;
  n2 = 0;
  s1 = '';
  s2 = '';

  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.myObservable = new Observable(
      (observer: Observer<number>) => {
        let index = 0;
        console.log('%c Observable Created', 'background: #ccc; color: #ff0000')
        setInterval(() => {
          index++;
          console.log('%c index = ' + index, 'background: #ccc; color: #0000ff')
          index === 5 ? observer.complete() : observer.next(index);
        }, 1000);
      }
    );

    // this.usingSubjects();
    // this.usingPublish();
    this.usingShare();
  }

  
  usingShare() {
    // A DIFERENÇA ENTRE O SHARE() E O PUBLISH() COM REFCOUNT()
    // É QUE SE O OBSERVABLE TIVER COMPLETADO E OUTRO MÉTODO DER SUBSCRIBE
    // NESSE MÉTODO, ELE COMEÇA A GERAR OS DADOS NOVAMENTE.
    // ISSO NÃO ACONTECE NO PUBLISH COM REFCOUNT().
    const multiCasted = this.myObservable.pipe(share());

    // Subscriber 1
    this.s1 = 'Waiting for interval...';
    setTimeout(() => {
      multiCasted.subscribe((numberSubscribe) => {
        this.n1 = numberSubscribe;
        this.s1 = 'Ok';
      });
    }, 2000);


    // Subscriber 2
    this.s2 = 'Waiting for interval...';
    setTimeout(() => {
      multiCasted.subscribe((numberSubscribe) => {
        this.n2 = numberSubscribe;
        this.s2 = 'Ok';
      });
    }, 4000);
  }

  usingPublish() {
    // const multiCasted = this.myObservable.pipe(publish(), refCount());
    const multiCasted: ConnectableObservable<number> = this.myObservable
      .pipe(publish()) as ConnectableObservable<number>;
    multiCasted.connect();

    // Subscriber 1
    this.s1 = 'Waiting for interval...';
    setTimeout(() => {
      multiCasted.subscribe((numberSubscribe) => {
        this.n1 = numberSubscribe;
        this.s1 = 'Ok';
      });
    }, 2000);


    // Subscriber 2
    this.s2 = 'Waiting for interval...';
    setTimeout(() => {
      multiCasted.subscribe((numberSubscribe) => {
        this.n2 = numberSubscribe;
        this.s2 = 'Ok';
      });
    }, 4000);
  }

  usingSubjects() {
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);

    this.s1 = 'Waiting for interval...';

    // Subscriber 1
    setTimeout(() => {
      subject.subscribe((numberSubscribe) => {
        this.n1 = numberSubscribe;
        this.s1 = 'Ok';
      });
    }, 2000);

    this.s2 = 'Waiting for interval...';

    // Subscriber 2
    setTimeout(() => {
      subject.subscribe((numberSubscribe) => {
        this.n2 = numberSubscribe;
        this.s2 = 'Ok';
      });
    }, 4000);
  }

}
