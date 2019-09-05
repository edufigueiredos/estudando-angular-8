import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { toArray, map, delay } from 'rxjs/operators';

interface User {
  login: string;
  name: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  protected options$: Observable<string[]>;
  protected user$: Observable<User>;

  constructor() { }

  ngOnInit() {
    this.options$ = new Observable<string[]>((observer: Observer<string[]>) => {
      for (let index = 0; index < 10; index++) {
        observer.next([`This is my ${index} option`]);
      }
      observer.complete();
    }).pipe(
      map(value => `${value}!`),
      toArray(),
      delay(1000)
    );

    // this.options$.subscribe(value => console.log(value));

    this.user$ = new Observable<User>((observer: Observer<User>) => {
      const names = ['Mr. James', 'Mr. John', 'Mr. Ray', 'Ms Angel'];
      const logins = ['james', 'john', 'ray', 'angel'];

      let index = 0;
      setInterval(() => {
        if (index === 4) {
          observer.complete()
        } else {
          observer.next({ login: logins[index], name: names[index] });
        }
        index++;
      }, 3000);
    });

    this.user$.subscribe(value => console.log(value));
  }

}
