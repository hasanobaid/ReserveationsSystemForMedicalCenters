import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Employee} from '../models/employee.model';
import {Job} from '../models/job.model';
import {Specialist} from '../models/specialist.model';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  jobs: Job[];
  sp: Specialist[];
  employees: Employee[];
  activity: Activity[];
  url = this.appComponent.getURL();

  constructor(private appComponent: AppComponent,
              private  http: HttpClient) {
  }

  add_employee(employee: Employee): Observable<Employee[]> {
    return this.http.post(`${this.url}/employee/add/add-employee`, {data: employee}, {responseType: 'text'})
      .pipe(map((res) => {
          this.employees = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.employees;
        }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  get_employee(): Observable<Employee[]> {
    return this.http.get(`${this.url}/employee/get/get-employee`, {responseType: 'json'}).pipe(
      map((res) => {
        this.employees = res[`data`];
        console.log(this.employees);
        return this.employees;
      }),
      catchError(this.handleError));
  }

  getjob(): Observable<Job[]> {
    return this.http.get(`${this.url}/employee/get/get-job`, {responseType: 'json'}).pipe(
      map((res) => {
        this.jobs = res[`data`];
        return this.jobs;
      }),
      catchError(this.handleError));
  }

  getsp(): Observable<Specialist[]> {
    return this.http.get(`${this.url}/employee/get/get-sp`, {responseType: 'json'}).pipe(
      map((res) => {
        this.sp = res[`data`];
        return this.sp;
      }),
      catchError(this.handleError));
  }

  updateemployee(employee: Employee): Observable<Employee[]> {
    return this.http.post(`${this.url}/employee/update/update-employee`, {data: employee}, {responseType: 'text'})
      .pipe(map((res) => {
          this.employees = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.employees;
        }),
        catchError(this.handleError));
  }

  get_activity(empID: string): Observable<Activity[]> {
    return this.http.get(`${this.url}/employee/get/get-history.php?rempID=` + empID, {responseType: 'json'}).pipe(
      map((res) => {
        this.activity = res[`data`];
        console.log(this.activity);
        return this.activity;
      }),
      catchError(this.handleError));
  }
}

interface Activity {
  patientID: number;
  firstname: string;
  lastname: string;
  activity: string;
  date: string;
}
