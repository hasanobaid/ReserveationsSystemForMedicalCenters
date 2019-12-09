import {Component, OnInit} from '@angular/core';
import {Vacation} from '../../models/vacation.model';
import {DoctorServiceService} from '../../service/doctor-service.service';
import {Employee} from '../../models/employee.model';
import {EmployeeServiceService} from '../../service/employee-service.service';

@Component({
  selector: 'app-vacation-date',
  templateUrl: './vacation-date.component.html',
  styleUrls: ['./vacation-date.component.css']
})
export class VacationDateComponent implements OnInit {
  vec = new Vacation(0, 0, new Date(), '', '', '');

  vacations: Vacation[];
  error = '';

  doctors: Employee[] = [];


  constructor(private doctorService: DoctorServiceService,
              private employeeService: EmployeeServiceService) {
  }

  ngOnInit() {
    this.loadDoctors();
    this.loadvacation();
  }

  // add_employee(f) {
  //   this.employeeservice.add_employee(this.employee)
  //     .subscribe(
  //       (res: Employee[]) => {
  //         // Update the list of cars
  //         this.employees = res;
  //         // Inform the user
  //         console.log(this.employees);
  //         this.success = 'Created successfully';
  //         console.log(this.success);
  //         // Reset the form
  //         f.reset();
  //       },
  //       (err) => this.error = err
  //     );
  // }
  private loadvacation() {
    this.doctorService.get_vacation().subscribe(
      (res: Vacation[]) => {
        this.vacations = res;
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

  approve(x: Vacation) {

  }

  decline(x: Vacation) {

  }
}
