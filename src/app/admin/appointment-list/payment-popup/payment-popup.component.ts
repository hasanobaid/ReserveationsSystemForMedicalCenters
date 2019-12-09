import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Payment} from '../../../models/payment.model';
import {PaymentServiceService} from '../../../service/payment-service.service';
import {MessageService} from 'primeng/api';
import {Employee} from '../../../models/employee.model';
import {EmployeeServiceService} from '../../../service/employee-service.service';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.css']
})
export class PaymentPopupComponent implements OnInit {
  title: 'Payment';

  @Input() employeeID;
  @Input() patientID;

  payment = new Payment('', 0, '', '', '', '', '', '');

  payments: Payment[] = [];
  employees: Employee[];

  constructor(public activeModal: NgbActiveModal,
              private paymentService: PaymentServiceService,
              private messageService: MessageService,
              private employeeService: EmployeeServiceService) {
  }

  ngOnInit() {
    this.loademployee();

    const d = new Date();
    this.payment.senddate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    this.payment.patientID = this.patientID;

  }

  getCurrentModel() {
    return JSON.stringify(this.payment);
  }

  addPayment() {
    this.addPaymentApi();
  }

  getEmpIdByUsername(str: string) {
    const i = this.employees.findIndex(x => x.username === str);
    return this.employees[i].empID;
  }

  private addPaymentApi() {
    this.paymentService.add_payments(this.payment)
      .subscribe(
        (res: Payment[]) => {
          // Update the list of cars
          this.payments = res;
          this.messageService.add({
            severity: 'success',
            summary: 'Funds Added',
            detail: this.payment.amount + '₪'
          });
          // Reset the form
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error! Try Again',
            detail: '' + err
          });
        }
      );
  }

  private loademployee() {
    this.employeeService.get_employee().subscribe(
      (res: Employee[]) => {
        this.employees = res;
        console.log(this.employees);
      },
      (err) => {
      }, () => {
        this.payment.empID = this.getEmpIdByUsername(this.employeeID);
      }
    );
  }
}
