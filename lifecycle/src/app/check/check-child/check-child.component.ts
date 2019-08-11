import { Component, OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy } from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-check-child',
  templateUrl: './check-child.component.html',
  styleUrls: ['./check-child.component.css']
})
export class CheckChildComponent implements OnInit, OnChanges, DoCheck, AfterContentInit,
AfterContentChecked, AfterViewInit, OnDestroy {

  constructor() {
    console.log('     CheckChild: constructor')
  }

  ngOnInit(): void {
    console.log('     CheckChild: ngOnInit');
  }
  ngOnChanges(): void {
    console.log('     CheckChild: ngOnChanges');
  }
  ngDoCheck(): void {
    console.log('     CheckChild: ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('     CheckChild: ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('     CheckChild: ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('     CheckChild: ngAfterViewInit');
  }
  ngOnDestroy() {
    console.log('     CheckChild: ngOnDestroy');
  }

}
