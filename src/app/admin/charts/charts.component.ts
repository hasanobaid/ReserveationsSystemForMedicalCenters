import {Component, OnInit} from '@angular/core';
import {ChartServiceService} from '../../service/chart-service.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Clinic} from '../../models/clinic.model';
import {ClinicServiceService} from '../../service/clinic-service.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  // @documentation: https://www.chartjs.org/docs/latest
  // data for bar chart
  gendercount: CharOne[];
  clinicount: CharTwo[];
  incomecount: CharThree[];
  reservationcount: CharFour[];

  clinics: Clinic[];


  error = '';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2019'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [12, 2], label: 'f'},
    {data: [23, 3], label: 'm'}
  ];

  // data for doughnut chart
  public doughnutChartLabels = ['Incoming Q1', 'Incoming Q2', 'Incoming Q3', 'Incoming Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  // data for pie
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  // data for line
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  public lineChartData = [120, 133, 180, 70, 99, 200, 123, 300, 202, 155, 230, 182];
  public lineChartType = 'line';

  fromdate: Date = new Date();
  todate: Date = new Date();
  year: any;
  years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  constructor(private charService: ChartServiceService,
              private clinicService: ClinicServiceService) {
  }

  ngOnInit() {
    this.loadClinicsAll();
    this.loadGender();
    this.loadIncome();
    this.loadClinics();
    this.loadReservation();
  }


  yearChanged() {
    //  TODO: implement this
    console.log('selected year: ' + this.year);
  }

  private loadGender() {
    this.charService.get_gender().subscribe(
      (res: CharOne[]) => {
        this.gendercount = res;
        // console.log(this.gendercount);
      },
      (err) => {
        this.error = err;
      }, () => {
        this.barChartData = [];
        this.gendercount.forEach(x => {
          this.barChartData.push({data: [x.value, 0, 0], label: x.gender});
        });
      }
    );
  }

  private loadClinics() {
    this.charService.get_clinics().subscribe(
      (res: CharTwo[]) => {
        this.clinicount = res;
        console.log(this.clinicount);
      },
      (err) => {
        this.error = err;
      }, () => {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.clinicount.forEach(x => {
          this.pieChartLabels.push(this.getClinicName(x.clinicID));
          this.pieChartData.push(x.value);
        });
      }
    );
  }

  private loadIncome() {
    this.charService.get_income().subscribe(
      (res: CharThree[]) => {
        this.incomecount = res;
        console.log(this.incomecount);
      },
      (err) => {
        this.error = err;
      }, () => {
        this.doughnutChartLabels = [];
        this.doughnutChartData = [];
        this.incomecount.forEach(x => {
          this.doughnutChartData.push(x.value);
          this.doughnutChartLabels.push(x.incoming);
        });
      }
    );
  }

  private loadReservation() {
    this.charService.get_reservation().subscribe(
      (res: CharFour[]) => {
        this.reservationcount = res;
        console.log(this.reservationcount);
      },
      (err) => {
        this.error = err;
      }, () => {
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.reservationcount.forEach(x => {
          this.lineChartData.push(x.value);
          this.lineChartLabels.push(x.month);
        });
      }
    );
  }

  getClinicName(value: any) {
    const k = this.clinics.findIndex(x => x.clinicID === value);
    if (k !== -1) {
      return this.clinics[k].clinicname;
    }
  }

  private loadClinicsAll() {
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

interface CharOne {
  value: number;
  gender: string;
}

interface CharTwo {
  value: number;
  clinicID: string;
}

interface CharThree {
  value: number;
  incoming: string;
}

interface CharFour {
  value: number;
  month: string;
}
