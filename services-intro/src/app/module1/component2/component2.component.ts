import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../service1.service';
import { Service2Service } from 'src/app/service2.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css'],
  // providers: [Service1Service]
})
export class Component2Component implements OnInit {

  num = 0;
  text: string;

  constructor(
    private myService1: Service1Service,
    private myService2: Service2Service
  ) { }

  ngOnInit() {
    this.num = this.myService1.num;
    this.text = this.myService2.text;
  }

}
