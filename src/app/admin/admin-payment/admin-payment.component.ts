import {Component, OnInit} from '@angular/core';
import {Paymentdetails} from '../../models/paymentdetails.model';
import {PaymentServiceService} from '../../service/payment-service.service';
import {Patient} from '../../models/patient.model';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {Employee} from '../../models/employee.model';
import {PaymentPopupComponent} from '../appointment-list/payment-popup/payment-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../service/auth.service';
import {EmployeeServiceService} from '../../service/employee-service.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {

  fromdate = new Date();
  todate = new Date();
  patient = '';

  details: Paymentdetails[] = [];
  allDetails = this.details;
  error = '';
  patients: Patient[] = [];
  emps: Employee[] = [];

  constructor(private paymentService: PaymentServiceService,
              private patinetService: PatinetSeviceService,
              private modalService: NgbModal,
              private authService: AuthService,
              private employeeService: EmployeeServiceService) {
  }

  ngOnInit() {
    this.loaddetails();
    this.loadpatient();
    this.loademployee();

    setInterval(() => {
      this.onSelectPatient(this.patient);
    }, 10000);
  }

  private loademployee() {
    this.employeeService.get_employee().subscribe(
      (res: Employee[]) => {
        this.emps = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loaddetails() {
    this.paymentService.getpaymentdetails().subscribe(
      (res: Paymentdetails[]) => {
        this.details = res;
        console.log(this.details);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  dateChanged() {
    // this.details = this.allDetails.filter(x =>
    //   x.senddate === this.setDateFormat(this.fromdate) || x.senddate.toString() === this.setDateFormat(this.todate));
  }

  onSelectPatient(id: string) {
    if (id !== '') {
      this.details = this.allDetails.filter(x => x.patientID === id);
    } else {
      this.loaddetails();
    }
  }

  private loadpatient() {
    this.patinetService.get_patient().subscribe(
      (res: Patient[]) => {
        this.patients = res;
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getCurrentModel() {
    return JSON.stringify(this.patient);
  }

  setDateFormat(date5: Date) {
    let tmpdate = '';
    tmpdate += date5.getFullYear();
    console.log(date5.getFullYear());
    if (+date5.getUTCMonth() < 10) {
      tmpdate += '-0' + (+date5.getMonth() + 1);
    } else {
      tmpdate += '-' + (+date5.getMonth() + 1);
    }

    if (+date5.getUTCDate() < 10) {
      tmpdate += '-0' + date5.getDate();
    } else {
      tmpdate += '-' + date5.getDate();
    }
    return tmpdate;
  }

  getPatientName(patientID: string) {
    const k = this.patients.findIndex(x => x.patientID.toString() === patientID);
    if (k !== -1) {
      return this.patients[k].firstname + ' ' + this.patients[k].lastname;
    }

  }

  getEmployeeName(empID: any) {
    const k = this.emps.findIndex(x => x.empID === empID);
    console.log(k);
    if (k !== -1) {
      return this.emps[k].firstname + ' ' + this.emps[k].lastname;
    }
  }

  openAddComponent(patientID: string) {
    const modalRef = this.modalService.open(PaymentPopupComponent);
    modalRef.componentInstance.title = 'Add Payment';
    modalRef.componentInstance.employeeID = this.authService.getUserId();
    modalRef.componentInstance.patientID = patientID;
  }

  printTable() {
    const printContent = document.getElementById('tableTable');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.outerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
}
