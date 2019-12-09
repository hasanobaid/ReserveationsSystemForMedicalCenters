import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../models/employee.model';
import {EmployeeServiceService} from '../../../service/employee-service.service';

@Component({
  selector: 'app-employee-list-full',
  templateUrl: './employee-list-full.component.html',
  styleUrls: ['./employee-list-full.component.css']
})
export class EmployeeListFullComponent implements OnInit {
  emp = new Employee('', '', '', '', '', '', '', '', new Date()
    , '', '', '', '', '', '', '', '', '');

  error = '';
  success = '';
  employees: Employee[];
  allEmps: Employee[];

  constructor(private employeeservice: EmployeeServiceService) {
  }

  ngOnInit() {
    this.loademployee();
  }

  private loademployee() {
    this.employeeservice.get_employee().subscribe(
      (res: Employee[]) => {
        this.allEmps = res;
        this.employees = this.allEmps;
        console.log(this.employees);
      },
      (err) => {
        this.error = err;
      }
    );
  }


  onSearch(value: string, option: string) {
    if (option === 'id') {
      this.employees = this.allEmps.filter(x => x.empID.toString() === value);
    }
    if (option === 'name') {
      this.employees = this.allEmps.filter(x => x.firstname === value || x.secondname === value ||
        x.thirdname === value || x.lastname === value);
    }
    if (option === 'phonenumber') {
      this.employees = this.allEmps.filter(x => x.phonenumber === value
        || x.emergencynumber === value || x.mobilenumber === value);
    }
  }

  clearSearch() {
    this.employees = this.allEmps;
  }
}
