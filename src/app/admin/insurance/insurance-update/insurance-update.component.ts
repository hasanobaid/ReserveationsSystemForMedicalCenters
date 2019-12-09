import {Component, Input, OnInit} from '@angular/core';
import {Insurancefull} from '../../../models/insurancefull.model';
import {Insurance} from '../../../models/insurance.model';
import {Subinsurance} from '../../../models/subinsurance.model';
import {InsuranceServiceService} from '../../../service/insurance-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InsuranceAddClinicsComponent} from '../insurance-add-clinics/insurance-add-clinics.component';

@Component({
  selector: 'app-insurance-update',
  templateUrl: './insurance-update.component.html',
  styleUrls: ['./insurance-update.component.css']
})
export class InsuranceUpdateComponent implements OnInit {

  insurance = new Insurance(0, '');
  subInsurance = new Subinsurance(0, 0, 0, '');
  insurancefull = new Insurancefull(0, '', 0, 0, '', new Date());
  insurancefulls: Insurancefull[];
  // insuramces: Insurancefull[];
  subinsurances: Subinsurance[];
  success = '';
  error = '';
  insurances: Insurance[];

  constructor(private insuranceService: InsuranceServiceService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadall();
    this.loadinsurance();
    this.loadsub();
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
      },
      (err) => {
        this.error = err;
      }, () => {
        this.insurancefulls.forEach(x => console.log(x));
      }
    );
  }

  private loadinsurance() {
    this.insuranceService.getinsurance().subscribe(
      (res: Insurance[]) => {
        this.insurances = res;
        console.log(this.insurances);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadsub() {
    this.insuranceService.getsubinsurance().subscribe(
      (res: Subinsurance[]) => {
        this.subinsurances = res;
        console.log(this.subinsurances);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getCurrentModel() {
    return JSON.stringify(this.insurancefull);
  }

  openAddComponent(insuranceId: any, subInsuranceID: any) {
    const modalRef = this.modalService.open(InsuranceAddClinicsComponent);
    modalRef.componentInstance.title = 'Add clinics';
    modalRef.componentInstance.insuranceID = insuranceId;
    modalRef.componentInstance.subInsuranceID = subInsuranceID;
  }
}
