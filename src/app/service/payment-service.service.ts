import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Patientpayment} from '../models/patientpayment.model';
import {Paymentdetails} from '../models/paymentdetails.model';
import {AppComponent} from '../app.component';
import {Payment} from '../models/payment.model';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export class PaymentServiceService {
  payment: Patientpayment[];
  details: Paymentdetails[];
  payments: Payment[];
  url = this.appComponent.getURL();

  constructor(private appComponent: AppComponent,
              private  http: HttpClient) {
  }

  getpayment(): Observable<Patientpayment[]> {
    return this.http.get(`${this.url}/payment/get/get_payment`, {responseType: 'json'}).pipe(
      map((res) => {
        this.payment = res[`data`];
        return this.payment;
      }),
      catchError(this.handleError));
  }

  getpaymentdetails(): Observable<Paymentdetails[]> {
    return this.http.get(`${this.url}/payment/get/get-paymentdetails`, {responseType: 'json'}).pipe(
      map((res) => {
        this.details = res[`data`];
        console.log(this.details);
        return this.details;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  add_paymentdetails(detail: Paymentdetails): Observable<Paymentdetails[]> {
    return this.http.post(`${this.url}/patient/add/add-patient`, {data: detail}, {responseType: 'text'})
      .pipe(map((res) => {
          this.details = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.details;
        }),
        catchError(this.handleError));
  }

  add_payments(payment: Payment) {
    return this.http.post(`${this.url}/payment/add/add_payment`, {data: payment}, {responseType: 'text'})
      .pipe(map((res) => {
          this.payments = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.payments;
        }),
        catchError(this.handleError));
  }

  get_payments(): Observable<Payment[]> {
    return this.http.get(`${this.url}/payment/get/get-payments`, {responseType: 'json'}).pipe(
      map((res) => {
        this.payments = res[`data`];
        console.log(this.details);
        return this.payments;
      }),
      catchError(this.handleError));
  }
}
