import { Component, OnInit, OnDestroy } from '@angular/core';

import { Department } from './../models/department';
import { DepartmentService } from '../services/department/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  departmentName = '';
  departments: Department[] = [];
  departmentEdit: Department = null;
  private unsubscribe$ = new Subject<any>();

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(allDepartments => this.departments = allDepartments);
  }

  save() {
    if (this.departmentEdit) {
      this.departmentService.update({ name: this.departmentName, _id: this.departmentEdit._id })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((department: Department) => {
          console.log(department);
          this.notify('Updated!');
        }, (error) => {
          this.notify('Error');
          console.log(error);
        });
    } else {
      this.departmentService.add({ name: this.departmentName })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((department: Department) => {
          this.notify('Inserted');
          this.clearFields();
        }, (error) => console.log(error));
    }
  }

  clearFields() {
    this.departmentName = '';
    this.departmentEdit = null;
  }

  cancel() {
    this.clearFields();
  }

  deleteDepartment(department: Department) {
    this.departmentService.delete(department)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => this.notify('Removed!'),
        (error) => this.notify(error.error.message)
      );
  }

  editDepartment(department: Department) {
    this.departmentName = department.name;
    this.departmentEdit = department;
  }

  notify(message: string) {
    this.snackBar.open(message, 'Ok', { duration: 3000 });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}
