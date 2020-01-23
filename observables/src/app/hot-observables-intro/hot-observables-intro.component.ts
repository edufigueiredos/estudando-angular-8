import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable, fromEvent, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.css']
})
export class HotObservablesIntroComponent implements OnInit {

  @ViewChild('myButton', { static: true }) button: ElementRef;

  constructor() { }

  ngOnInit() {
    const myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click');
    myBtnClickObservable.subscribe(event => {
      console.log('Button clicked 1');
    });
    myBtnClickObservable.subscribe(event => {
      console.log('Button clicked 2');
    });

    class Producer {

      // myListeners é um array de Functions
      private myListeners = [];
      private n = 0;
      private id: any;

      addListener(functionReceived) {
        this.myListeners.push(functionReceived);
        console.warn('LENGTH LISTENER ', this.myListeners.length);
      }

      start() {
        this.id = setInterval(() => {
          this.n++;
          console.log('From Producer: ' + this.n);
          for (const functionParameter of this.myListeners) {
            functionParameter(this.n);
          }

          console.log(this.myListeners);
        }, 1000);
      }

      stop() {
        clearInterval(this.id);
      }
    }

    const producer: Producer = new Producer();
    producer.start();

    setTimeout(() => {
      producer.addListener((consoleLogFunction) => {
        console.log('From listener 1 ', consoleLogFunction);
      });
      producer.addListener((consoleLogFuncion) => {
        console.log('From listener 2 ', consoleLogFuncion);
      });
    }, 4000);

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListener((n) => observer.next(n));
      }
    );
    myHotObservable.subscribe(n => {
      console.log('From Subscriber 1 ', n);
    });
    myHotObservable.subscribe(n => {
      console.log('From Subscriber 2 ', n);
    });

    setTimeout(() => { producer.stop(); }, 10000);
  }
}
