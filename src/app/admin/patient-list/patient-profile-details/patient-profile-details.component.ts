import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {Quantom} from '../../../models/quantom.model';
import {City} from '../../../models/city.model';
import {PatinetSeviceService} from '../../../service/patinet-sevice.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Patientpayment} from '../../../models/patientpayment.model';
import {Paymentdetails} from '../../../models/paymentdetails.model';

@Component({
  selector: 'app-patient-profile-details',
  templateUrl: './patient-profile-details.component.html',
  styleUrls: ['./patient-profile-details.component.css']
})
export class PatientProfileDetailsComponent implements OnInit {

  patient = new Patient('', '', '', '', '', '',
    new Date(), '', '', '', '', 0,
    '', '', '', '', 0, '', '', '');
  id: number;
  quantom: Quantom;
  cities: City;

  fromdate = new Date();
  todate = new Date();
  minDate = new Date();

  invalidDates: Array<Date> = [];
  childs: Patient[] = [];
  error = '';

  patientID = 0;

  patientPayment: Patientpayment = new Patientpayment('', 0, '', '');
  patientDetails: Paymentdetails[] = [
    new Paymentdetails('1', '2', '100', '12-12-2012', 'Cheque', '1'),
    new Paymentdetails('1', '2', '100', '12-12-2012', 'Cheque', '1'),
    new Paymentdetails('1', '2', '100', '12-12-2012', 'Cheque', '1'),
  ];

  constructor(private patientService: PatinetSeviceService,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    // this will return patient by id
    const id = this.route.params.subscribe((params: Params) => {
      this.id = +params[`id`];
      this.patient = this.patientService.patients[this.id];
      this.patientID = this.patient.patientID;
      console.log(this.patient.patientID);
    });
    this.loadchild();
  }

  onDateChanged() {
    console.log(this.fromdate, this.todate);
  }

  private loadchild() {
    this.patientService.get_child(this.patientID + '').subscribe(
      (res: Patient[]) => {
        this.childs = res;
        console.log(this.childs);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private getPatientPayment() {

  }

  private getPatientPaymentDetails() {

  }
}
