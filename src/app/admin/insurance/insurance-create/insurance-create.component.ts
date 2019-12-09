import {Component, OnInit} from '@angular/core';
import {InsuranceServiceService} from '../../../service/insurance-service.service';
import {Insurance} from '../../../models/insurance.model';
import {Subinsurance} from '../../../models/subinsurance.model';
import {Insurancefull} from '../../../models/insurancefull.model';

@Component({
  selector: 'app-insurance-create',
  templateUrl: './insurance-create.component.html',
  styleUrls: ['./insurance-create.component.css']
})
export class InsuranceCreateComponent implements OnInit {

  // insurance = new Insurance(0, '');
  // subInsurance = new Subinsurance(0, 0, 0, '');
  insurancefull = new Insurancefull(0, '', 0, 0, '', new Date());
  insurancefulls: Insurancefull[];
  // insuramces: Insurancefull[];
  // subinsurances: Subinsurance[];
  success = '';
  error = '';

  constructor(private insuranceService: InsuranceServiceService) {
  }

  ngOnInit() {
    this.loadall();
  }


  add_insurance(f) {
    this.insuranceService.add_insurance(this.insurancefull)
      .subscribe(
        (res: Insurancefull[]) => {
          // Update the list of cars
          this.insurancefulls = res;
          // Inform the user
          console.log(this.insurancefulls);
          this.success = 'Created successfully';
          console.log(this.success);
          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  private loadall() {
    this.insuranceService.getall().subscribe(
      (res: Insurancefull[]) => {
        this.insurancefulls = res;
        console.log(this.insurancefulls);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getCurrentModel() {
    return JSON.stringify(this.insurancefull);
  }
}
