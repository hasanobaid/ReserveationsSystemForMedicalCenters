import {Component, OnInit} from '@angular/core';
import {DoctorServiceService} from '../../service/doctor-service.service';
import {Vacation} from '../../models/vacation.model';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-doctor-vacation',
  templateUrl: './doctor-vacation.component.html',
  styleUrls: ['./doctor-vacation.component.css']
})
export class DoctorVacationComponent implements OnInit {
  vacation = new Vacation(0, 0, new Date(), '', '', '');

  fromtime: Date = new Date();
  totime: Date = new Date();

  notes = '';
  vacations: Vacation[];
  success = '';
  error = '';

  constructor(private doctorService: DoctorServiceService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadDoctorId();
    this.loadvacation();
  }

  add_vacation(f) {
    this.doctorService.add_vacation(this.vacation)
      .subscribe(
        (res: Vacation[]) => {
          // Update the list of cars
          this.vacations = res;
          //  the user
          console.log(this.vacations);
          this.success = 'Created successfully';
          console.log(this.vacations);
          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );

  }

  private loadDoctorId() {
    const k = this.authService.emp.empID;
    this.vacation.empID = +k;
  }

  private loadvacation() {
    this.doctorService.get_vacation().subscribe(
      (res: Vacation[]) => {
        this.vacations = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
