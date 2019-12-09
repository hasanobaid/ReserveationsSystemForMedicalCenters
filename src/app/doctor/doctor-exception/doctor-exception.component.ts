import {Component, OnInit} from '@angular/core';
import {DoctorServiceService} from '../../service/doctor-service.service';
import {Exception} from '../../models/exception.model';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-doctor-exception',
  templateUrl: './doctor-exception.component.html',
  styleUrls: ['./doctor-exception.component.css']
})
export class DoctorExceptionComponent implements OnInit {
  exception = new Exception(0, 0, new Date(), '', '', '', false);

  fromtime: Date = new Date();
  totime: Date = new Date();
  notes = '';
  exceptions: Exception[];
  success = '';
  error = '';

  constructor(private doctorService: DoctorServiceService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadDoctorId();
    this.loadexceprion();
  }

  private loadDoctorId() {
    const k = this.authService.emp.empID;
    this.exception.empID = +k;
  }

  add_exception(f) {
    this.doctorService.add_exception(this.exception)
      .subscribe(
        (res: Exception[]) => {
          // Update the list of cars
          this.exceptions = res;
          //  the user
          console.log(this.exceptions);
          this.success = 'Created successfully';
          console.log(this.exceptions);
          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  private loadexceprion() {
    this.doctorService.get_exception().subscribe(
      (res: Exception[]) => {
        this.exceptions = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
