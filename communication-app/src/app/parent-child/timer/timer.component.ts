import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  miliseconds = 0;
  interval: any;
  running = false;

  constructor() { }

  ngOnInit() {
  }

  start() {
    if (!this.running) {
      this.interval = setInterval(() => {
        this.miliseconds += 5;
      }, 5);
    }
    this.running = true;
  }

  stop() {
    if (this.running) {
      clearInterval(this.interval);
      this.running = false;
    }
  }

  clear() {
    this.miliseconds = 0;
  }

  round(n: number): number {
    return Math.round(n);
  }
}
