import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css']
})
export class ChildItemComponent implements OnInit {

  @Input() title: string;
  // @Output() plusOne = new EventEmitter<any>();
  // @Output() plusTwo = new EventEmitter<any>();
  // @Output() minusOne = new EventEmitter<any>();
  // @Output() minusTwo = new EventEmitter<any>();
  @Output() inc = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {
  }

  buttonClick(number) {
    this.inc.emit(number)
  }
  // plusOneClick() {
  //   // this.plusOne.emit()
  //   this.inc.emit(1)
  // }
  // plusTwoClick() {
  //   // this.plusTwo.emit()
  //   this.inc.emit(2)
  // }

  // minusOneClick() {
  //   // this.minusOne.emit()
  //   this.inc.emit(-1)
  // }
  // minusTwoClick() {
  //   // this.minusTwo.emit()
  //   this.inc.emit(-2)
  // }

}
