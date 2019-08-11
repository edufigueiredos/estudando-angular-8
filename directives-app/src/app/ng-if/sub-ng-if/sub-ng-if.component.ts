import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sub-ng-if',
  templateUrl: './sub-ng-if.component.html',
  styleUrls: ['./sub-ng-if.component.css']
})
export class SubNgIfComponent implements OnInit, OnDestroy {

  constructor() {
    console.log('Criei o sub-ng-if')
  }

  ngOnInit() {
    console.log('Dentro do ngOnInit');
  }

  ngOnDestroy() {
    console.log('Destruindo o sub-ng-if');
  }

}
