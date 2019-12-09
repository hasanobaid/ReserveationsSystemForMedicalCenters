import {Component, OnInit} from '@angular/core';
import {PaymentServiceService} from '../../service/payment-service.service';
import {AuthService} from '../../service/auth.service';
import {Paymentdetails} from '../../models/paymentdetails.model';
import {Patientpayment} from '../../models/patientpayment.model';
import {Employee} from '../../models/employee.model';
import {EmployeeServiceService} from '../../service/employee-service.service';
import {Payment} from '../../models/payment.model';

@Component({
  selector: 'app-patient-payment-list',
  templateUrl: './patient-payment-list.component.html',
  styleUrls: ['./patient-payment-list.component.css']
})
export class PatientPaymentListComponent implements OnInit {
  patientID = 0;

  payments: Paymentdetails[] = [];
  patientPayment: Patientpayment[] = [];
  emps: Employee[] = [];

  totalBalance: any;
  lastPaymentDate: any;

  constructor(private paymentService: PaymentServiceService,
              private employeeService: EmployeeServiceService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.patientID = +this.authService.getUserId();
    }
    this.loadDetails();
    this.loadPayments();
    this.loadEmployee();
  }

  private loadDetails() {
    this.paymentService.getpaymentdetails().subscribe(
      (res: Paymentdetails[]) => {
        this.payments = res;
        console.log(this.payments);
      },
      (err) => {
      }, () => {
        this.payments = this.payments.filter(x => x.patientID === this.patientID.toString());
      }
    );
  }

  private loadPayments() {
    this.paymentService.getpayment().subscribe(
      (res: Patientpayment[]) => {
        this.patientPayment = res;
        console.log(this.patientPayment);
      },
      () => {
      }, () => {
        this.patientPayment = this.patientPayment.filter(x => x.patientID === this.patientID.toString());
        this.totalBalance = this.patientPayment[0].balance;
        this.lastPaymentDate = this.patientPayment[0].lastpaymentdate;
      }
    );
  }

  getEmployeeName(empID: string) {
    const k = this.emps.findIndex(x => x.empID === empID);
    console.log(k);
    if (k !== -1) {
      return this.emps[k].firstname + ' ' + this.emps[k].lastname;
    }
  }

  private loadEmployee() {
    this.employeeService.get_employee().subscribe(
      (res: Employee[]) => {
        this.emps = res;
      },
      (err) => {
      }
    );
  }
}
