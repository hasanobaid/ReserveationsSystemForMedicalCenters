import {Component, OnInit} from '@angular/core';
import {PatinetSeviceService} from '../../../service/patinet-sevice.service';
import {ClinicServiceService} from '../../../service/clinic-service.service';
import {Clinic} from '../../../models/clinic.model';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrls: ['./clinic-create.component.css']
})
export class ClinicCreateComponent implements OnInit {
  clinics = [];
  clinic = new Clinic('', 0);

  error = '';
  success = '';

  constructor(private clinicservice: ClinicServiceService) {
  }

  ngOnInit() {
    this.loadclinic();
  }

  add_clinic(f) {
    this.clinicservice.add_clinic(this.clinic)
      .subscribe(
        (res: Clinic[]) => {
          // Update the list of cars
          this.clinics = res;
          // Inform the user
          console.log(this.clinics);
          this.success = 'Created successfully';
          console.log(this.success);
          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );


  }

  private loadclinic() {
    this.clinicservice.get_clinic().subscribe(
      (res: Clinic[]) => {
        this.clinics = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
