import {Component, OnInit} from '@angular/core';
import {DoctorServiceService} from '../../service/doctor-service.service';
import {Exception} from '../../models/exception.model';
import {Employee} from '../../models/employee.model';
import {Vacation} from '../../models/vacation.model';
import {EmployeeServiceService} from '../../service/employee-service.service';

@Component({
  selector: 'app-exception-date',
  templateUrl: './exception-date.component.html',
  styleUrls: ['./exception-date.component.css']
})
export class ExceptionDateComponent implements OnInit {
  exception = new Exception(0, 0, new Date(), '', '', '', false);
  exceptions: Exception[];
  sucssess = '';
  error = '';

  doctors: Employee[] = [];


  constructor(private doctorService: DoctorServiceService,
              private employeeService: EmployeeServiceService) {
  }

  ngOnInit() {
    this.loadDoctors();
    this.loadexception();
  }

  private loadexception() {
    this.doctorService.get_exception().subscribe(
      (res: Exception[]) => {
        this.exceptions = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getDoctorName(value: any) {
    const k = this.doctors.findIndex(x => x.empID === value);
    if (k !== -1) {
      return this.doctors[k].firstname + ' ' + this.doctors[k].lastname;
    }
  }

  private loadDoctors() {
    this.employeeService.get_employee().subscribe(
      (res: Employee[]) => {
        this.doctors = res;

      },
      (err) => {
        this.error = err;
      }
    );
  }

  approve(x: Exception) {

  }

  decline(x: Exception) {

  }
}
