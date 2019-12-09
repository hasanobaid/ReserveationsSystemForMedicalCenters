import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Insurance} from '../models/insurance.model';
import {Subinsurance} from '../models/subinsurance.model';
import {Insurancefull} from '../models/insurancefull.model';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class InsuranceServiceService {
  url = this.appComponent.getURL();

  constructor(private appComponent: AppComponent,
              private  http: HttpClient) {
  }

  // insurance = new Insurance(0, ' ');
  // subinsurance = new Subinsurance(0, 0, 0, '');
  insurances: Insurance[];
  subinsurances: Subinsurance[];
  success = '';
  error = '';
  insurancefulls: Insurancefull[];

  getinsurance(): Observable<Insurance[]> {
    return this.http.get(`${this.url}/insurance/get/get-insurance`, {responseType: 'json'}).pipe(
      map((res) => {
        this.insurances = res[`data`];
        return this.insurances;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  getsubinsurance(): Observable<Subinsurance[]> {
    return this.http.get(`${this.url}/insurance/get/get-subinsurance`, {responseType: 'json'}).pipe(
      map((res) => {
        this.subinsurances = res[`data`];
        return this.subinsurances;
      }),
      catchError(this.handleError));
  }

  add_insurance(insurancefull: Insurancefull): Observable<Insurancefull[]> {
    return this.http.post(`${this.url}/insurance/add/add-insurance`, {data: insurancefull}, {responseType: 'text'})
      .pipe(map((res) => {
          this.insurancefulls = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.insurancefulls;
        }),
        catchError(this.handleError));
  }

  add_subinsurance(subinsurance: Subinsurance): Observable<Subinsurance[]> {
    return this.http.post(`${this.url}/insurance/add/add-subinsurance`, {data: subinsurance}, {responseType: 'text'})
      .pipe(map((res) => {
          this.subinsurances = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.subinsurances;
        }),
        catchError(this.handleError));
  }

  getall(): Observable<Insurancefull[]> {
    return this.http.get(`${this.url}/insurance/get/get-all`, {responseType: 'json'}).pipe(
      map((res) => {
        this.insurancefulls = res[`data`];
        return this.insurancefulls;
      }),
      catchError(this.handleError));
  }

}
