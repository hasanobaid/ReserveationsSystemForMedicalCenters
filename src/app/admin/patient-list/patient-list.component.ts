import {Component, OnInit} from '@angular/core';
import {Patient} from '../../models/patient.model';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {


  constructor(private patientservice: PatinetSeviceService) {
  }

  ngOnInit() {
    // const x = new Patient('Ahmad', 'Jamal', 'Ahmad', 'Thabet',
    //   'ahmad.j.thabet@gmail.com', 'pp', new Date(),
    //   '0598223589', '0598223589', '8908', '90909090', 'trust',
    //   'male', 'r', 'Ramallah', 'Ramallah', '96682828282');
    // this.patients.push(x);
  }


}
