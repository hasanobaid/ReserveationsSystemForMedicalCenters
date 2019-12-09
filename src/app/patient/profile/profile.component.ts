import {Component, OnInit} from '@angular/core';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {Patient} from '../../models/patient.model';
import {Quantom} from '../../models/quantom.model';
import {City} from '../../models/city.model';
import {Patientpayment} from '../../models/patientpayment.model';
import {Paymentdetails} from '../../models/paymentdetails.model';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  patient: Patient;

  patients: Patient[] = [];
  id: number;

  quantom: Quantom;
  cities: City;

  fromdate = new Date();
  todate = new Date();
  minDate = new Date();

  invalidDates: Array<Date> = [];
  childs: Patient[];
  error = '';

  patientID = 0;

  patientPayment: Patientpayment = new Patientpayment('', 0, '', '');
  patientDetails: Paymentdetails[] = [
    new Paymentdetails('1', '2', '100', '12-12-2012', 'Cheque', '1'),
    new Paymentdetails('1', '2', '100', '12-12-2012', 'Cheque', '1'),
    new Paymentdetails('1', '2', '100', '12-12-2012', 'Cheque', '1'),
  ];

  constructor(private patientService: PatinetSeviceService,
              public route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.patientID = +this.authService.getUserId();
    }
    console.log(this.patientID);
    this.loadpatients();
    this.loadchild();


  }

  onDateChanged() {
    console.log(this.fromdate, this.todate);
  }

  private loadchild() {
    this.patientService.get_child(this.patientID.toString()).subscribe(
      (res: Patient[]) => {
        this.childs = res;
        console.log(this.childs);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadpatients() {
    this.patientService.get_patient().subscribe(
      (res: Patient[]) => {
        this.patients = res;
        console.log(this.patients);
      },
      (err) => {
        this.error = err;
      }, () => {
        this.patient = this.patients.find(x => +x.patientID === this.patientID);
      }
    );
  }

  private getPatientPayment() {

  }

  private getPatientPaymentDetails() {

  }

  getCurrentModel() {
    return JSON.stringify(this.patient);
  }
}


/*
import {Component, OnInit} from '@angular/core';
import {ReadFile} from '../../models/ReadFile';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  src: string;
  disable = true;
  myFormGroup = new FormGroup({
    name: new FormControl(),
    secondName: new FormControl(),
    thirdName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    address: new FormControl(),
    personalID: new FormControl(),
    email: new FormControl(),
    dateofbirth: new FormControl(),
    phonenumber: new FormControl(),
    insuranceID: new FormControl(),
    insurancecompany: new FormControl()
  });
  user = {
    firstname: 'john',
    secondname: 'snow',
    thirdname: 'james',
    lastname: 'mark',
    email: 'jsnow@gmail.com',
    dateofbirth: new Date(),
    phonenumber: '+123456789',
    mobilenumber: '+91223332',
    insuranceID: '1232131231',
    subinsuranceID: 'As122121',
    insurancecompany: 'Trust',
    gender: 'male',
    address: 'batn al hawa, ramallah',
    personalID: '120',
  };

  constructor() {
  }

  makeEditable() {
    this.disable = false;
  }

  ngOnInit() {
    if (localStorage.getItem('ImageUrl') != null) {
      this.src = localStorage.getItem('ImageUrl');
    } else {
      this.src = './assets/imgs/user4.jpg';
    }
  }

  onFilePicked(file: ReadFile) {
    this.src = file.content;
    localStorage.setItem('ImageUrl', file.content);
  }

  getFullName() {
    return this.user.firstname + ' ' + this.user.lastname;
  }

}
*/
