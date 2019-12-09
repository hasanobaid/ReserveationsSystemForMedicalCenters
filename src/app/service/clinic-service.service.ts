import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Clinic} from '../models/clinic.model';
import {Employee} from '../models/employee.model';
import {ClinicDoctor} from '../models/clinic-doctor.model';
import {InsurancePrice} from '../models/insuranceprice.model';
import {ClinicPrice} from '../models/clinicprice.model';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ClinicServiceService {
  url = this.appComponent.getURL();

  constructor(private appComponent: AppComponent,
              private  http: HttpClient) {
  }


  clinocdoctors: ClinicDoctor[];
  clinics: Clinic[];
  doctors: Employee[];
  insuranceprices: InsurancePrice[];
  clinicprices: ClinicPrice[];
  doctorID: Employee[] = [];

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  get_clinic(): Observable<Clinic[]> {
    return this.http.get(`${this.url}/clinic/get/get-clinic`, {responseType: 'json'}).pipe(
      map((res) => {
        this.clinics = res[`data`];
        // console.log(this.clinics);
        return this.clinics;
      }),
      catchError(this.handleError));
  }

  add_clinic(clinic: Clinic): Observable<Clinic[]> {
    return this.http.post(`${this.url}/clinic/add/add-clinic`, {data: clinic}, {responseType: 'text'})
      .pipe(map((res) => {
          this.clinics = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.clinics;
        }),
        catchError(this.handleError));
  }

  add_doctorClinic(doctor: ClinicDoctor) {
    return this.http.post(`${this.url}/doctor/add/add-doctor`, {data: doctor}, {responseType: 'text'})
      .pipe(map((res) => {
          this.clinocdoctors = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.clinocdoctors;
        }),
        catchError(this.handleError));
  }

  getdoctors(): Observable<Employee[]> {
    return this.http.get(`${this.url}/doctor/get/get-doctorsp`, {responseType: 'json'}).pipe(
      map((res) => {
        this.doctors = res[`data`];
        // console.log(this.clinics);
        return this.doctors;
      }),
      catchError(this.handleError));
  }

  get_clinic_doctors(): Observable<ClinicDoctor[]> {
    return this.http.get(`${this.url}/doctor/get/get-doctor`, {responseType: 'json'}).pipe(
      map((res) => {
        this.clinocdoctors = res[`data`];
        // console.log(this.clinics);
        return this.clinocdoctors;
      }),
      catchError(this.handleError));
  }

  get_clinicprice(): Observable<ClinicPrice[]> {
    return this.http.get(`${this.url}/pricce/get/get-clinicprice`, {responseType: 'json'}).pipe(
      map((res) => {
        this.clinicprices = res[`data`];
        return this.clinicprices;
      }),
      catchError(this.handleError));
  }

  get_insuranceprice(): Observable<InsurancePrice[]> {
    return this.http.get(`${this.url}/price/get/get-insuranceprice`, {responseType: 'json'}).pipe(
      map((res) => {
        this.insuranceprices = res[`data`];
        // console.log(this.clinics);
        return this.insuranceprices;
      }),
      catchError(this.handleError));
  }

  add_clinicPrice(price: ClinicPrice) {
    return this.http.post(`${this.url}/price/add/add-insuranceprice`, {data: price}, {responseType: 'text'})
      .pipe(map((res) => {
          this.clinicprices = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.clinicprices;
        }),
        catchError(this.handleError));
  }

  add_insurancePrice(price: InsurancePrice) {
    return this.http.post(`${this.url}/price/add/add-insuranceprice`, {data: price}, {responseType: 'text'})
      .pipe(map((res) => {
          this.insuranceprices = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.insuranceprices;
        }),
        catchError(this.handleError));
  }

  get_byID(employee: number) {
    return this.http.post(`${this.url}/doctor/get/test`, {data: employee}, {responseType: 'text'})
      .pipe(map((res) => {
          this.doctorID = res[`data`];
          console.log('ok');
          console.log('this is data ' + res[`data`]);
          return this.doctorID;
        }),
        catchError(this.handleError));
  }

  getID(id: number): Observable<Employee[]> {
    return this.http.post(`${this.url}/doctor/get/test`, {data: id}, {responseType: 'text'}).pipe(
      map((res) => {
        this.doctorID = res[`data`];
        console.log('this is data ' + res[`data`]);
        // console.log(this.clinics);
        return this.doctorID;
      }),
      catchError(this.handleError));
  }
}
