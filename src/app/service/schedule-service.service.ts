import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Schadule} from '../models/schedule.model';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {

  schedules: Schadule[];
  url = this.appComponent.getURL();

  constructor(private appComponent: AppComponent,
              private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  get_schedule(): Observable<Schadule[]> {
    return this.http.get(`${this.url}/admin/get/get-schedule`, {responseType: 'json'}).pipe(
      map((res) => {
        this.schedules = res[`data`];
//        console.log('ww' + this.schedules);
        return this.schedules;
      }),
      catchError(this.handleError));
  }

  add_schedule(schedule: Schadule): Observable<Schadule[]> {
    return this.http.post(`${this.url}/admin/add/create-schedule`, {data: schedule}, {responseType: 'text'})
      .pipe(map((res) => {
          this.schedules = res[`data`];
          console.log('ok');
          console.log(res[`data`]);
          return this.schedules;
        }),
        catchError(this.handleError));
  }

  get_ex(empID: number, clinicID: number) {
    return this.http.get(`${this.url}/appointment/update/update-ex.php?clinicID=` + clinicID + `&empID=` + empID,
      {responseType: 'json'}).pipe(
      map((res: any) => {
        this.schedules = res;
        console.log(res);
        console.log(this.schedules);
        // console.log(this.clinics);
        return this.schedules;
      }),
      catchError(this.handleError));
  }

}
