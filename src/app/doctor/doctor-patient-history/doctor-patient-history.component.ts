import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {Patient} from '../../models/patient.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doctor-patient-history',
  templateUrl: './doctor-patient-history.component.html',
  styleUrls: ['./doctor-patient-history.component.css']
})
export class DoctorPatientHistoryComponent implements OnInit {
  title = 'Patient History';
  @Input() employeeID;
  @Input() patientID;

  list: any[] = [];
  patients: Patient[] = [];

  constructor(public route: ActivatedRoute,
              private patientService: PatinetSeviceService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  getPatientName() {
    const k = this.patients.findIndex(x => x.patientID.toString() === this.patientID);
    if (k !== -1) {
      return this.patients[k].firstname + ' ' + this.patients[k].lastname;
    }

  }
}
