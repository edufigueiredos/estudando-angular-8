import { Component, OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy, Input } from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements
  OnInit, DoCheck, OnChanges, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterContentChecked, OnDestroy {

    @Input() teste: string;

  name: string;
  age: number;

  constructor() {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }
  ngOnChanges(): void {
    console.log('ngOnChanges');
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
