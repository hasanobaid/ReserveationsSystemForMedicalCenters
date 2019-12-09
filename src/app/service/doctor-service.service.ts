import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Vacation} from '../models/vacation.model';
import {Exception} from '../models/exception.model';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  url = this.appComponent.getURL();

  constructor(private appComponent: AppComponent,
              private  http: HttpClient) {
  }

  vac: Vacation[];
  exc: Exception[];

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  get_exception(): Observable<Exception[]> {
    return this.http.get(`${this.url}/admin/get/get-exception`, {responseType: 'json'}).pipe(
      map((res) => {
        this.exc = res[`data`];
        console.log(this.exc);
        return this.exc;
      }),
      catchError(this.handleError));
  }

  add_exception(ex: Exception): Observable<Exception[]> {
    return this.http.post(`${this.url}/admin/add/add-exception`, {data: ex}, {responseType: 'text'})
      .pipe(map((res) => {
          this.exc = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.exc;
        }),
        catchError(this.handleError));
  }

  get_vacation(): Observable<Vacation[]> {
    return this.http.get(`${this.url}/admin/get/get-vacation`, {responseType: 'json'}).pipe(
      map((res) => {
        this.vac = res[`data`];
        console.log(this.vac);
        return this.vac;
      }),
      catchError(this.handleError));
  }

  add_vacation(vacation: Vacation): Observable<Vacation[]> {
    return this.http.post(`${this.url}/admin/add/add-vacation`, {data: vacation}, {responseType: 'text'})
      .pipe(map((res) => {
          this.vac = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.vac;
        }),
        catchError(this.handleError));
  }

}
