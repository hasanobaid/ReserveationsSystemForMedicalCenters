import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AppComponent} from '../app.component';
import {Employee} from '../models/employee.model';
import {EmployeeServiceService} from './employee-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appComponent: AppComponent,
              private http: HttpClient,
              private router: Router,
              private messageService: MessageService,
              private empService: EmployeeServiceService
  ) {
  }

  loggedIn = false;
  user: LoggedUser;

  patient: User[] = [];
  doctor: User[] = [];
  admin: User[] = [];
  reception: User[] = [];

  emp: Employee;
  emps: Employee[] = [];

  url = this.appComponent.getURL();

  // return date formt
  setDateFormat(date: Date) {
    let x = '';
    x += date.getFullYear();
    if (date.getMonth() < 10) {
      x += '-0' + (date.getMonth() + 1);
    } else {
      x += '-' + (date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
      x += '-0' + date.getDate();
    } else {
      x += '-' + date.getDate();
    }
    return x;
  }

  login(user: User) {
    console.log('this from ts: ' + user.id + '-' + user.password + '-' + user.type);

    this.user = {
      id: user.id,
      type: user.type
    };

    if (this.patient.length !== 0 && user.type === '1') {
      // patient login
      this.loggedIn = true;
      this.router.navigate(['patient']);
      this.showSuccessAlarm();
    } else if (this.reception.length !== 0 && user.type === '2') {
      // reception login
      this.loggedIn = true;
      this.router.navigate(['reception']);
      this.showSuccessAlarm();
    } else if (this.doctor.length !== 0 && user.type === '3') {
      // doctor login
      this.loggedIn = true;
      this.router.navigate(['doctor']);
      this.showSuccessAlarm();
    } else if (this.admin.length !== 0 && user.type === '4') {
      // admin login
      this.loggedIn = true;
      this.router.navigate(['admin']);
      this.showSuccessAlarm();
    } else {
      this.loggedIn = false;
      this.user = {id: '', type: ''};
      this.showFailAlarm();
    }

  }

  isAuth() {
    return this.loggedIn;
  }

  getUserId() {
    return this.user.id;
  }

  getUserType() {
    return this.user.type;
  }

  logout() {
    this.loggedIn = false;
    this.user = {id: '', type: ''};

    this.patient = [];
    this.doctor = [];
    this.admin = [];
    this.reception = [];

    this.router.navigate(['../']);
    this.messageService.add({
      severity: 'info',
      summary: 'Logged Out',
      detail: 'See you soon :)'
    });

    sessionStorage.clear();
    localStorage.clear();

  }

  showSuccessAlarm() {
    this.messageService.add({
      severity: 'success',
      summary: 'Logged In',
      detail: 'Successful'
    });
  }

  showFailAlarm() {
    this.messageService.add({
      severity: 'error',
      summary: 'Incorrect!',
      detail: 'Please check again'
    });
  }

  patient_login(patientID: string, password: string): Observable<User[]> {
    return this.http.get(`${this.url}/login/patient-login?patientID=` + patientID + `&password=` + password,
      {responseType: 'json'}).pipe(
      map((res) => {
        this.patient = res[`data`];
        console.log(this.patient);
        return this.patient;
      }),
      catchError(this.handleError));
  }

  doctor_login(username: string, password: string): Observable<User[]> {
    return this.http.get(`${this.url}/login/doctor-login?username=` + username + `&password=` + password,
      {responseType: 'json'}).pipe(
      map((res) => {
        this.doctor = res[`data`];
        console.log(this.doctor);
        this.getEmpObject(username);
        return this.doctor;
      }),
      catchError(this.handleError));
  }

  admin_login(username: string, password: string): Observable<User[]> {
    return this.http.get(`${this.url}/login/admin-login?username=` + username + `&password=` + password,
      {responseType: 'json'}).pipe(
      map((res) => {
        this.admin = res[`data`];
        console.log(this.admin);
        this.getEmpObject(username);

        return this.admin;
      }),
      catchError(this.handleError));
  }

  reception_login(username: string, password: string): Observable<User[]> {
    return this.http.get(`${this.url}/login/reception-login?username=` + username + `&password=` + password,
      {responseType: 'json'}).pipe(
      map((res) => {
        this.reception = res[`data`];
        this.getEmpObject(username);
        console.log(this.reception);
        return this.reception;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  getEmpObject(username: string) {
    this.empService.get_employee().subscribe(
      (res: Employee[]) => {
        this.emps = res;
      }, () => {
      }, () => {
        if (this.getUserType() !== '1' && this.getUserType() !== '0') {
          const k = this.emps.findIndex(x => x.username === username);
          if (k !== -1) {
            this.emp = this.emps[k];
          }
        }
      }
    );
  }

}

interface User {
  id: string;
  password: string;
  type: string;
}

interface LoggedUser {
  id: string;
  type: string;
}


