import { Component, OnInit, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from 'src/app/data-model.model';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;

  protected log: string[] = [];
  protected connected = false;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

  logData(dataModel: DataModel) {
    this.log.push(`Timestamp: ${dataModel.timestamp}, Data: ${dataModel.data}`);
  }

  connect() {
    this.log.push('Connected');
    this.connected = true;
    this.subscription = this.subject.subscribe(
      (data: DataModel) => this.logData(data),
      (error) => this.connected = false,
      () => {
        this.connected = false;
        this.log.push('Finished!');
      }

    );
  }

  disconnect() {
    this.subscription.unsubscribe();
    this.connected = false;
  }

}
