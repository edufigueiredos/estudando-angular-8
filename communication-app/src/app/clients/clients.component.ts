import { Component, OnInit } from '@angular/core';
import { Clients } from './clients.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  name = '';
  age = 0;
  clients: Clients[] = [];

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.clients.push(
      { name: this.name, age: this.age }
    );
    this.name = '';
    this.age = 0;
  }

  deleteClient(index: number) {
    this.clients.splice(index, 1);
  }

  updateClient(client: Clients, index: number) {
    this.clients[index] =  client;
  }

}
