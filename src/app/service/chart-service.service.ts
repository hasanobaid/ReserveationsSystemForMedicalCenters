import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {
  url = this.appComponent.getURL();
  charone: CharOne[];
  chartwo: CharTwo[];
  charthree: CharThree[];
  charfour: CharFour[];

  constructor(private appComponent: AppComponent,
              private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  get_gender(): Observable<CharOne[]> {
    return this.http.get(`${this.url}/count/gender-count`, {responseType: 'json'}).pipe(
      map((res) => {
        this.charone = res[`data`];
        // console.log(this.charone);
        return this.charone;
      }),
      catchError(this.handleError));

  }

  get_clinics(): Observable<CharTwo[]> {
    return this.http.get(`${this.url}/count/clinic-count`, {responseType: 'json'}).pipe(
      map((res) => {
        this.chartwo = res[`data`];
        console.log(this.chartwo);
        return this.chartwo;
      }),
      catchError(this.handleError));

  }

  get_income(): Observable<CharThree[]> {
    return this.http.get(`${this.url}/count/count-income`, {responseType: 'json'}).pipe(
      map((res) => {
        this.charthree = res[`data`];
        console.log(this.charthree);
        return this.charthree;
      }),
      catchError(this.handleError));

  }

  get_reservation(): Observable<CharFour[]> {
    return this.http.get(`${this.url}/count/reservation-count`, {responseType: 'json'}).pipe(
      map((res) => {
        this.charfour = res[`data`];
        console.log(this.charfour);
        return this.charfour;
      }),
      catchError(this.handleError));

  }
}

interface CharOne {
  value: number;
  gender: string;
}

interface CharTwo {
  value: number;
  clinicID: string;
}

interface CharThree {
  value: number;
  incoming: string;
}

interface CharFour {
  value: number;
  month: string;
}
