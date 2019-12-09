import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ClinicServiceService} from '../../../service/clinic-service.service';
import {InsuranceServiceService} from '../../../service/insurance-service.service';
import {Clinic} from '../../../models/clinic.model';
import {MessageService, SelectItem} from 'primeng/api';
import {InsurancePrice} from '../../../models/insuranceprice.model';

@Component({
  selector: 'app-insurance-add-clinics',
  templateUrl: './insurance-add-clinics.component.html',
  styleUrls: ['./insurance-add-clinics.component.css']
})
export class InsuranceAddClinicsComponent implements OnInit {

  @Input() title = `Add Clinics`;
  @Input() insuranceID; // this is insurance id in array
  @Input() subInsuranceID; // this is insurance id in array

  selectedClinics: any[] = []; // this will have all clinics id's
  insurancePriceList: InsurancePrice[];
  insurancePrice = new InsurancePrice(0, 0, 0, 0);
  clinics: Clinic[];
  cc: SelectItem[];
  error = '';
  success = '';

  constructor(public activeModal: NgbActiveModal,
              private clinicService: ClinicServiceService,
              private insuranceService: InsuranceServiceService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.insurancePrice.insuranceID = this.insuranceID;
    this.insurancePrice.subinsuranceID = this.subInsuranceID;
    this.loadClinics();
    this.loadInsurancePrice();
  }

  private loadClinics() {
    this.clinicService.get_clinic().subscribe(
      (res: Clinic[]) => {
        this.clinics = res;
        console.log(res);
      },
      () => {
      }, () => {
        this.formatData();
      }
    );
  }

  private formatData() {
    this.cc = [];
    this.clinics.forEach(x => {
      this.cc.push({label: x.clinicname, value: x.clinicID});
    });
    console.log(this.cc);
  }

  AddClinics() {
    this.selectedClinics.forEach(x => {
      this.insurancePrice.clinicID = x;
      this.addClinicFull();
    });
  }

  private addClinicFull() {
    this.clinicService.add_insurancePrice(this.insurancePrice)
      .subscribe(
        (res: InsurancePrice[]) => {
          this.insurancePriceList = res;
          console.log(this.insurancePriceList);
          this.success = 'Created successfully';
          console.log(this.success);
        },
        (err) => {
          this.error = err;

        }, () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added Successfully',
            detail: this.insurancePrice.price + ''
          });
        }
      );
  }

  private loadInsurancePrice() {
    this.clinicService.get_insuranceprice().subscribe(
      (res: InsurancePrice[]) => {
        this.insurancePriceList = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }


  getCurrentModel() {
    return JSON.stringify(this.insurancePrice);
  }
}
