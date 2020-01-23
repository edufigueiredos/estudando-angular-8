import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { tap, map, catchError, retry, retryWhen, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startTest() {
    const obj: Observable<any> = new Observable((observer) => {
      for (let index = 0; index < 10; index++) {
        if (index === 7) {
          observer.error(`An error occurred when index = ${index}`);
        } else {
          observer.next(index);
        }
      }
    });
    obj
      .pipe(
        map(index => index * 10),
        // tap(index => console.log(`Before error handling ${index}`)),
        catchError(error => {
          console.warn(`Inside catch ${error}`);
          // return of(0);
          return throwError(`throwError: Error ${error}`);
        }),
        // retry(2),
        retryWhen(i => timer(5000))
      )
      // .subscribe(
      //   index => console.log(`Normal output: ${index}`),
      //   err => console.log(err),
      //   () => console.log('Completed!')
      // );

    const obj2: Observable<any> = new Observable((observer) => {
      timer(2000).subscribe(event => observer.next(1000));
      timer(2500).subscribe(event => observer.complete());
    });
    obj2
    // .pipe(
    //   timeout(2000)
    // )
    .subscribe(
      value => console.log(`Number: ${value}`),
      err => console.log(err),
      () => console.log('Completed!')
    )
  }

}
