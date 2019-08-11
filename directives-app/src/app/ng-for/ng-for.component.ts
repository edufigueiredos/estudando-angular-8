import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.css']
})
export class NgForComponent implements OnInit {

  names = [
    'Eduardo', 'Sandra', 'Paula', 'Dog'
  ];

  cidades = [
    {nome: 'Rio de Janeiro', sigla: 'RJ'},
    {nome: 'Porto Alegre', sigla: 'RS'},
    {nome: 'São Paulo', sigla: 'SP'},
    {nome: 'Curitiba', sigla: 'PR'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
