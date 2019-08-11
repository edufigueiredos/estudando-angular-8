import { Component, OnInit, Input } from '@angular/core';
import { IClient } from '../client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  @Input() client: IClient
  
  constructor() { }

  ngOnInit() {
  }

}
