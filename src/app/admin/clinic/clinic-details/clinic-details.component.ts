import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../../models/clinic.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ClinicServiceService} from '../../../service/clinic-service.service';
import {Employee} from '../../../models/employee.model';
import {ClinicDoctor} from '../../../models/clinic-doctor.model';
import {InsuranceServiceService} from '../../../service/insurance-service.service';
import {Insurance} from '../../../models/insurance.model';
import {Subinsurance} from '../../../models/subinsurance.model';
import {ClinicPrice} from '../../../models/clinicprice.model';
import {InsurancePrice} from '../../../models/insuranceprice.model';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicDetailsComponent implements OnInit {
  id: number;
  clinicprice = new ClinicPrice(0, 0);
  insuranceprice = new InsurancePrice(0, 0, 0, 0);
  clinicdoctor = new ClinicDoctor(0, this.id);
  clinic = new Clinic('', 0);
  employee = new Employee('', '', '', '',
    '', '', '', '', new Date(), '', '', '', '', '',
    '', '', '', '');
  doctors: Employee[];
  clinics: Clinic[] = [];
  alldoctors: ClinicDoctor[];
  success = '';
  error = '';
  insuranceprices: InsurancePrice[];
  clinicprices: ClinicPrice[];
  hasDiscount: false;

  insurances: Insurance[];
  subinsurances: Subinsurance[];


  constructor(private clinicService: ClinicServiceService,
              public route: ActivatedRoute,
              private insuranceservice: InsuranceServiceService) {
  }

  ngOnInit() {
    // this will return clinic by id
    const id = this.route.params.subscribe((params: Params) => {
      this.id = +params[`id`];
      this.clinic = this.clinicService.clinics[this.id];
    });
    this.loadalldoctors();
    this.loadClinics();
    this.loaddoctors();
    this.loadinsurance();
    this.loadsubinsurance();
  }

  add_doctorClinic(f) {
    this.clinicService.add_doctorClinic(this.clinicdoctor)
      .subscribe(
        // change type from any to clinics
        (res: ClinicDoctor[]) => {
          // Update the list of cars
          this.alldoctors = res;
          // Inform the user
          console.log('id ' + this.clinicdoctor.empID);
          this.success = 'Created successfully';
          console.log(this.success);
          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );

  }

  private loadClinics() {
    this.clinicService.get_clinic().subscribe(
      (res: Clinic[]) => {
        this.clinics = res;
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  update_insurance_price(f) {

  }

  add_insurance_price(f) {

  }

  private loadalldoctors() {
    this.clinicService.get_clinic_doctors().subscribe(
      (res: ClinicDoctor[]) => {
        this.alldoctors = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loaddoctors() {
    this.clinicService.getdoctors().subscribe(
      (res: Employee[]) => {
        this.doctors = res;
        console.log('docs: ' + this.doctors);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getCurrentModel() {
    return JSON.stringify(this.clinicdoctor);
  }

  private loadinsurance() {
    this.insuranceservice.getinsurance().subscribe(
      (res: Insurance[]) => {
        this.insurances = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadsubinsurance() {
    this.insuranceservice.getsubinsurance().subscribe(
      (res: Subinsurance[]) => {
        this.subinsurances = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  selectDoctor(value: string) {
    console.log(value);
    this.clinicdoctor.empID = +value;

  }
}
