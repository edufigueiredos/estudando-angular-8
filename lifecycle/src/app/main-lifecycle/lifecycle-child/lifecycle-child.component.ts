import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, AfterContentInit, AfterViewInit } from '@angular/core';

export interface ILifeCycleItem {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

  @Input() name: string;
  @Input() age: number;
  @Input() food: string;

  public events: ILifeCycleItem[] = [];
  nextEventId = 0;

  colors: string[] = ['accent', 'warn', 'primary'];

  constructor() {
    console.log(this.name + ' - constructor');
    this.newEvent('constructor');
  }

  ngOnInit() {
    console.log(this.name + ' - ngOnInit');
    this.newEvent('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.name + ' - ngOnChanges');
    this.newEvent('ngOnChanges');
    // if (changes.name) {
    //   console.log('new name ' + changes.name.currentValue);
    // }
    // for (const propName in changes) {
    //   if (changes.hasOwnProperty(propName)) {
    //     const element = changes[propName];
    //     console.log(element);
    //   }
    // }
  }

  ngAfterContentInit() {
    console.log(this.name + ' - ngAfterContentInit');
    this.newEvent('ngAfterContentInit');
  }

  ngAfterViewInit() {
    console.log(this.name + ' - ngAfterViewInit');
    this.newEvent('ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log(this.name + ' - ngOnDestroy');
    this.newEvent('ngOnDestroy');
  }

  newEvent(name: string) {
    const id = this.nextEventId++;
    this.events.push({ id, color: this.colors[id % this.colors.length], name });
    setTimeout(() => {
      const index = this.events.findIndex(e => e.id === id);
      if (index >= 0) {
        this.events.splice(index, 1);
      }
    }, 3000 + this.events.length * 1000);
  }

}
