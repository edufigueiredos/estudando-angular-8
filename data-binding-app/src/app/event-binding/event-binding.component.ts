import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent implements OnInit {

  buttonName = 'My Button'
  i = 0;
  spinnerMode = 'determinate';
  btnEnabled = true;

  constructor() { }

  ngOnInit() {
  }

  save() {
    console.log('Click');
  }

  inc() {
    this.i++;
    this.buttonName = `It was clicked ${this.i} times`;
  }

  disabled() {
    this.btnEnabled = false;
    this.spinnerMode = 'indeterminate';
    setTimeout(() => {
      this.btnEnabled = true;
      this.spinnerMode = 'determinate';
    }, 3000);
  }

}
