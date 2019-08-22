import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

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

}
