import {Component, OnInit} from '@angular/core';
import {Patient} from '../../models/patient.model';
import {City} from '../../models/city.model';
import {Quantom} from '../../models/quantom.model';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {InsuranceServiceService} from '../../service/insurance-service.service';
import {Insurance} from '../../models/insurance.model';
import {Subinsurance} from '../../models/subinsurance.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  patient = new Patient('', '', '', '', '', '',
    new Date(), '', '', '', '', 0,
    '', '', '', '', 0, '', '', '');

  insurance = new Insurance(0, '');
  subinsurance = new Subinsurance(0, 0, 0, '');
  quantom: Quantom[];
  quantoms: Quantom[];

  cities: City[];
  error = '';
  success = '';
  patients: Patient[];
  insurances: Insurance[];

  subincurances: Subinsurance[];
  subincurancess: Subinsurance[] = [];

  personalIDMatch: any;
  familyListType = '';

  hasID = false;
  validID = false;

  wifeID = 0;
  husbandID = 0;

  constructor(private patinetservice: PatinetSeviceService,
              private insuranceservice: InsuranceServiceService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadCities();
    this.loadquantom();
    this.loadpatient();
    this.loadinsurance();
    this.loadsubinsurance();
  }

  add_patient(f) {
    this.patinetservice.add_patient(this.patient)
      .subscribe(
        (res: Patient[]) => {
          // Update the list of cars
          this.patients = res;
          // Inform the user
          console.log(this.patients);
          this.success = 'Created successfully';
          console.log(this.success);

          this.messageService.add(
            {
              severity: 'success',
              summary: 'Created Successfully',
              detail: 'User is now registered in the system'
            });

          // Reset the form
          f.reset();
        },
        (err) => {
          this.error = err;

          this.messageService.add(
            {
              severity: 'error',
              summary: 'Not successfull!!',
              detail: 'There was an error'
            });
        }
      );
  }

  private loadCities() {
    this.patinetservice.getcity().subscribe(
      (res: City[]) => {
        this.cities = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadpatient() {
    this.patinetservice.get_patient().subscribe(
      (res: Patient[]) => {
        this.patients = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadquantom() {
    this.patinetservice.getquantom().subscribe(
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


  checkValidID() {
    const id = this.patient.patientID.toString();
    if (id.toString().length !== 9) {
      this.validID = false;
      this.messageService.add({
        severity: 'error',
        summary: 'lenght mush be 9',
        detail: 'the ID in invalid, check again'
      });
    } else if (id === null) {
      this.validID = false;
      this.messageService.add({
        severity: 'error',
        summary: 'can not be null',
        detail: 'the ID in invalid, check again'
      });
    } else {
      let Ldigit = 0;
      // @ts-ignore
      Ldigit = (id % 10);
      let j1 = 1; // division
      let j2 = 10; // mod
      let t1;
      let t2;
      const arr = Array();
      const arr2 = Array();
      for (let i = 0; i < 8; i++) {
        j1 = j1 * 10;
        j2 = j2 * 10;
        // @ts-ignore
        t1 = id % j2;
        t2 = (t1 / j1) | 0;
        arr[i] = t2;
      }
      let j = 7;
      for (let i = 0; i < 8; i++) {
        arr2[j] = arr[i];
        j--;
      }
      let odd = 1;
      for (let i = 0; i < 8; i++) {
        if (odd === 1) {
          arr2[i] = arr2[i] * 1;
          odd = 2;
        } else {
          arr2[i] = arr2[i] * 2;
          odd = 1;
        }
        if (arr2[i] > 9) {
          let temp = arr2[i].toString().split(''); // 12
          temp = Number(temp[0]) + Number(temp[1]);
          arr2[i] = temp;
        }
      }
      let sub = 0;
      for (let i = 0; i < 8; i++) {
        sub += arr2[i];
      }
      let Valid;
      Valid = sub.toString().split('');
      Valid = Valid[1];
      Valid = 10 - Valid;
      if (Ldigit === Valid) {
        this.validID = true;
      } else {
        this.validID = false;
        this.messageService.add({severity: 'warn', summary: 'Invalid', detail: 'the ID in invalid, check again'});
      }

    }

  }


  onSelectInsuranceCompany(value: string) {
    this.subincurancess = [];
    this.subincurancess = this.subincurances.filter(x => x.insuranceID.toString() === value);
  }
}
