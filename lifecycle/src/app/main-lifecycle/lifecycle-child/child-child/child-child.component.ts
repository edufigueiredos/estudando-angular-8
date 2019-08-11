import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-child-child',
  templateUrl: './child-child.component.html',
  styleUrls: ['./child-child.component.css']
})
export class ChildChildComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
    console.log('    Child Child ' + this.name + ' - ngOnInit');
  }

  ngOnChanges(): void {
    console.log('    Child Child ' + this.name + ' - ngOnChanges');
  }

  ngAfterContentInit() {
    console.log('    Child Child ' + this.name + ' - ngAfterContentInit');
  }

}
