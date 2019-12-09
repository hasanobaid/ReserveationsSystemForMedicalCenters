import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../../models/clinic.model';
import {ClinicServiceService} from '../../../service/clinic-service.service';


@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {
  clinic = new Clinic('', 0);

  clinics: Clinic[] = [];
  error = '';
  success = '';

  constructor(private clinicService: ClinicServiceService) {
  }

  ngOnInit() {
    this.loadClinics();
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

}
