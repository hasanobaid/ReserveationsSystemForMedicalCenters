import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {Quantom} from '../../../models/quantom.model';
import {City} from '../../../models/city.model';
import {PatinetSeviceService} from '../../../service/patinet-sevice.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Insurance} from '../../../models/insurance.model';
import {Subinsurance} from '../../../models/subinsurance.model';
import {InsuranceServiceService} from '../../../service/insurance-service.service';

@Component({
  selector: 'app-patient-edit-details',
  templateUrl: './patient-edit-details.component.html',
  styleUrls: ['./patient-edit-details.component.css']
})
export class PatientEditDetailsComponent implements OnInit {

  patient = new Patient('', '', '', '', '', '',
    new Date(), '', '', '', '', 0,
    '', '', '', '', 0, '', '', '');
  insurance = new Insurance(0, ' ');
  subinsurance = new Subinsurance(0, 0, 0, '');
  insurances: Insurance[];
  subincurances: Subinsurance[];

  quantom: Quantom[];
  quantoms: Quantom[];

  cities: City[];
  error = '';
  success = '';
  patients: Patient[];
  id: number;


  hasParent: boolean;
  hasInsurance: boolean;
  personalIDMatch: any;

  familyListType = '';
  insuranceListType = '';

  hasID = false;

  constructor(private patientService: PatinetSeviceService,
              public route: ActivatedRoute,
              public router: Router,
              private insuranceservice: InsuranceServiceService) {
  }

  ngOnInit() {
    this.loadCities();
    this.loadquantom();
    this.loadpatient();
    this.loadinsurance();
    this.loadsubinsurance();

    // this will return patient by id
    const i = this.route.params.subscribe((params: Params) => {
      this.id = +params[`id`];
      this.patients = this.patientService.patients;
      this.patient = this.patients[this.id];

      /*      this.patient = new Patient('Ahmad', 'Jamal', 'Ahmad', 'Thabet',
              'ahmad.j.thabet@gmail.com', 'pp', new Date(),
              '0598223589', '0598223589', '8908', '90909090', 'trust',
              'male', 'Ramallah', 'Ramallah', 'Ramallah', '96682828282');*/
    });


  }


  edit_patient(f) {
    this.patientService.update_patient(this.patient)
      .subscribe(
        (res: Patient[]) => {
          // Update the list of cars
          this.patients = res;
          // Inform the user
          console.log(this.patients);
          this.success = 'Created successfully';
          console.log(this.success);
          // Reset the form
          f.reset();
          this.router.navigate(['../']);
        },
        (err) => this.error = err
      );
  }

  private loadCities() {
    this.patientService.getcity().subscribe(
      (res: City[]) => {
        this.cities = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadpatient() {
    this.patientService.get_patient().subscribe(
      (res: Patient[]) => {
        this.patients = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadquantom() {
    this.patientService.getquantom().subscribe(
      (res: Quantom[]) => {
        this.quantom = res;
      },
      (err) => {
        this.error = err;
      }
    );
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
        this.subincurances = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  onSelectCity(value: string) {
    this.quantoms = [];
    this.quantoms = this.quantom.filter(x => x.cityID.toString() === value);
    console.log(value);
  }
}
