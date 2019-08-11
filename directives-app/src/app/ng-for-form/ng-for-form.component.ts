import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for-form',
  templateUrl: './ng-for-form.component.html',
  styleUrls: ['./ng-for-form.component.css']
})
export class NgForFormComponent implements OnInit {

  name: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  age: number = 0;
  cities = [
    { nome: 'Rio de Janeiro', sigla: 'RJ' },
    { nome: 'Porto Alegre', sigla: 'RS' },
    { nome: 'São Paulo', sigla: 'SP' },
    { nome: 'Curitiba', sigla: 'PR' }
  ];
  clients: any[] = [];

  constructor() { }

  ngOnInit() {
    this.clients.push(
      {
        name: 'Eduardo',
        phone: '964717070',
        address: 'Amapá',
        city: 'Rio de Janeiro',
        age: 26
      }
    );
  }

  save() {
    this.clients.push(
      {
        name: this.name,
        phone: this.phone,
        address: this.address,
        city: this.city,
        age: this.age
      }
    );
    this.cancel();
    console.log(this.clients);
  }

  cancel() {
    this.name = '';
    this.phone = '';
    this.address = '';
    this.city = '';
    this.age = 0;
  }

  delete(index: number) {
    this.clients.splice(index, 1);
  }

}
