import { Component, OnInit } from '@angular/core';
import { IClient } from '../client.model';

@Component({
  selector: 'app-main-lifecycle',
  templateUrl: './main-lifecycle.component.html',
  styleUrls: ['./main-lifecycle.component.css']
})
export class MainLifecycleComponent implements OnInit {

  foods: string[] = ['Rice', 'Beans', 'Pizza'];
  clients: IClient[] = [];

  name: string = 'Eduardo';
  age: number = 26;
  food: string;

  editClient = -1;

  randomNumber: number;

  constructor() {
    this.generateRandomNumber();
  }

  generateRandomNumber() {
    this.randomNumber = Math.round(Math.random() * 1000);
  }

  ngOnInit() {
  }

  save() {
    if (this.editClient === -1) {
      this.clients.push({
        name: this.name,
        age: this.age,
        food: this.food
      });
    } else {
      this.clients[this.editClient].name = this.name;
      this.clients[this.editClient].age = this.age;
      this.clients[this.editClient].food = this.food;
      this.editClient = -1;
    }
    this.name = null;
    this.age = null;
    this.food = null;
  }

  remove(index: number) {
    this.clients.splice(index, 1);
  }

  edit(index: number) {
    this.name = this.clients[index].name;
    this.age = this.clients[index].age;
    this.food = this.clients[index].food;
    this.editClient = index;
  }

}
