import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {PatinetSeviceService} from '../../../service/patinet-sevice.service';
import {InsuranceServiceService} from '../../../service/insurance-service.service';
import {Employee} from '../../../models/employee.model';
import {EmployeeServiceService} from '../../../service/employee-service.service';

@Component({
  selector: 'app-patient-list-full',
  templateUrl: './patient-list-full.component.html',
  styleUrls: ['./patient-list-full.component.css']
})
export class PatientListFullComponent implements OnInit {
  patients: Patient[];
  allPatients: Patient[];

  error = '';
  success = '';

  constructor(private patientservice: PatinetSeviceService,
              private insuranceService: InsuranceServiceService) {
  }

  ngOnInit() {
    this.loadpatient();
  }

  private loadpatient() {
    this.patientservice.get_patient().subscribe(
      (res: Patient[]) => {
        this.allPatients = res;
        this.patients = this.allPatients;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  onSearch(value: string, option: string) {
    if (option === 'id') {
      this.patients = this.allPatients.filter(x => x.patientID.toString() === value);
    }
    if (option === 'name') {
      this.patients = this.allPatients.filter(x => x.firstname === value || x.secondname === value ||
        x.thirdname === value || x.lastname === value);
    }
    if (option === 'phonenumber') {
      this.patients = this.allPatients.filter(x => x.phonenumber === value || x.mobilenumber);
    }

  }

  clearSearch() {
    this.patients = this.allPatients;
  }


}
