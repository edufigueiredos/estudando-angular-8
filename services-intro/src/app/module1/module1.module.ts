import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Service1Service } from './service1.service';



@NgModule({
  declarations: [Component1Component, Component2Component],
  imports: [
    CommonModule
  ],
  exports: [
    Component1Component, Component2Component
  ],
  providers: [ Service1Service ]
})
export class Module1Module { }
