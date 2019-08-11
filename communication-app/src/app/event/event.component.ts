import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  value = 0;
  title = 'My Title'
  constructor() { }

  ngOnInit() {
  }

  incBy(event) {
    this.value += event;
  }

  // decBy(n: number) {
  //   this.value -= n;
  // }

}
