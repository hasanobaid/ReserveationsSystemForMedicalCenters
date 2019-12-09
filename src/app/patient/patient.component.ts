import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patientID = 0;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.patientID = +this.authService.getUserId();
    }
    console.log(this.patientID);
  }

}
