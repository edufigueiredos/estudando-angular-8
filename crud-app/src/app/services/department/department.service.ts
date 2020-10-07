import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { Department } from 'src/app/models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = 'http://localhost:3000/departments';

  private departmentsSubject$ = new BehaviorSubject<Department[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
    if (!this.loaded) {
      this.http.get<Department[]>(this.url)
        .pipe(delay(1000))
        .subscribe(this.departmentsSubject$);
      this.loaded = true;
    }

    return this.departmentsSubject$.asObservable();
  }

  add(department: Department): Observable<Department> {
    return this.http.post<Department>(this.url, department).pipe(
      tap((auxDepartment: Department) =>
        this.departmentsSubject$.getValue().push(auxDepartment))
    );
  }

  delete(department: Department): Observable<any> {
    return this.http.delete(`${this.url}/${department._id}`).pipe(
      tap(() => {
        const departments = this.departmentsSubject$.getValue();
        const index = this.findIndex(departments, department);
        if (index >= 0) {
          departments.splice(index, 1);
        }
      })
    );
  }

  update(department: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.url}/${department._id}`, department).pipe(
      tap((newDepartment: Department) => {
        const departments = this.departmentsSubject$.getValue();
        const index = this.findIndex(departments, newDepartment);
        if (index >= 0) {
          departments[index] = newDepartment;
        }
      })
    );
  }

  private findIndex(departmentArray: Department[], findThisDepartment: Department): number {
    return departmentArray.findIndex(departmentIndex => departmentIndex._id === findThisDepartment._id);
  }

}
