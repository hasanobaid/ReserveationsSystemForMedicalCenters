import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../models/employee.model';
import {Quantom} from '../../../models/quantom.model';
import {City} from '../../../models/city.model';
import {Specialist} from '../../../models/specialist.model';
import {Job} from '../../../models/job.model';
import {PatinetSeviceService} from '../../../service/patinet-sevice.service';
import {EmployeeServiceService} from '../../../service/employee-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-employee-edit-details',
  templateUrl: './employee-edit-details.component.html',
  styleUrls: ['./employee-edit-details.component.css']
})
export class EmployeeEditDetailsComponent implements OnInit {
  employee = new Employee('', '', '', '', '', '', '', '', new Date()
    , '', '', '', '', '', '', '', '', '');

  quantom: Quantom[];
  cities: City[];
  specialists: Specialist[];
  jobs: Job[];
  error = '';
  success = '';
  employees: Employee[];
  id: number;

  constructor(private route: ActivatedRoute, private patientservice: PatinetSeviceService, private employeeservice: EmployeeServiceService, private router: Router) {
  }

  ngOnInit() {
    this.loadcities();
    this.loadjob();
    this.loadquantom();
    this.loadsp();
    this.loademployee();

    // this will return patient by id
    const i = this.route.params.subscribe((params: Params) => {
      this.id = +params[`id`];
      this.employees = this.employeeservice.employees;
      this.employee = this.employees[this.id];
    });
  }

  edit_employee(f) {
    this.employeeservice.updateemployee(this.employee)
      .subscribe(
        (res: Employee[]) => {
          // Update the list of cars
          this.employees = res;
          // Inform the user
          console.log(this.employees);
          this.success = 'Created successfully';
          console.log(this.success);
          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  private loadquantom() {
    this.patientservice.getquantom().subscribe(
      (res: Quantom[]) => {
        this.quantom = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadcities() {
    this.patientservice.getcity().subscribe(
      (res: City[]) => {
        this.cities = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadsp() {
    this.employeeservice.getsp().subscribe(
      (res: Specialist[]) => {
        this.specialists = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadjob() {
    this.employeeservice.getjob().subscribe(
      (res: Job[]) => {
        this.jobs = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loademployee() {
    this.employeeservice.get_employee().subscribe(
      (res: Employee[]) => {
        this.employees = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
