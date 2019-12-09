import {Component, OnInit} from '@angular/core';
import {Quantom} from '../../models/quantom.model';
import {City} from '../../models/city.model';
import {Employee} from '../../models/employee.model';
import {Specialist} from '../../models/specialist.model';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {EmployeeServiceService} from '../../service/employee-service.service';
import {Job} from '../../models/job.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employee = new Employee('', '', '', '', '', '', '', '', new Date()
    , '', '', '', '', '', '', '', '', '');

  quantom: Quantom[];
  quantoms: Quantom[];
  cities: City[];
  specialists: Specialist[];
  jobs: Job[];
  error = '';
  success = '';
  employees: Employee[];

  constructor(private patientservice: PatinetSeviceService, private employeeservice: EmployeeServiceService) {
  }

  ngOnInit() {
    this.loadcities();
    this.loadjob();
    this.loadsp();
    this.loademployee();
    this.loadquantom();
  }


  add_employee(f) {
    this.employeeservice.add_employee(this.employee)
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

  onSelectCity(value: string) {
    this.quantoms = [];

    this.quantoms = this.quantom.filter(x => x.cityID.toString() === value);
  }
}
