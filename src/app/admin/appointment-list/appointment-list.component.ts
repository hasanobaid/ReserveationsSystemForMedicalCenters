import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../models/clinic.model';
import {ClinicDoctor} from '../../models/clinic-doctor.model';
import {ClinicServiceService} from '../../service/clinic-service.service';
import {AppoinmentServiceService} from '../../service/appoinment-service.service';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {EmployeeServiceService} from '../../service/employee-service.service';
import {ScheduleServiceService} from '../../service/schedule-service.service';
import {MessageService} from 'primeng/api';
import {Employee} from '../../models/employee.model';
import {Appointment} from '../../models/appointment.model';
import {Schadule} from '../../models/schedule.model';
import {Payment} from '../../models/payment.model';
import {PaymentServiceService} from '../../service/payment-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../service/auth.service';
import {PaymentPopupComponent} from './payment-popup/payment-popup.component';
import {AppointmentPrice} from '../../models/appointmentprice.model';
import {PatientUpdateAppointmentComponent} from '../../patient/patient-appointment-list/patient-update-appointment/patient-update-appointment.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  error = '';
  success = '';

  date = new Date();

  selectedClinic: any;
  selectedDoctor: any;
  insurancePrice = new AppointmentPrice(0, 0);
  appointmentPrice: AppointmentPrice[] = [];
  appointments: Appointment[] = [];
  filteredAppointment: Appointment[] = [];
  appointment = new Appointment(0, 0, 0, 0, 0, '', '');

  doctors: ClinicDoctor[];
  doctorss: ClinicDoctor[];

  clinics: Clinic[];

  doctorsID: Employee[] = [];
  doctorsIDs: Employee[] = [];

  doctorsSchedule: Schadule[] = [];
  doctorsSchedules: Schadule[] = [];
  payments: Payment[];
  payment = new Payment('', 0, '', '', '', '', '', '');

  empID = '';

  constructor(private clinicService: ClinicServiceService,
              private appointmentService: AppoinmentServiceService,
              private patinetservice: PatinetSeviceService,
              private employeeService: EmployeeServiceService,
              private scheduleService: ScheduleServiceService,
              private messageService: MessageService,
              private paymentService: PaymentServiceService,
              private modalService: NgbModal,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loaddoctors();
    this.loadalldoctors();
    this.loadAppointmant();
    this.loadClinics();
    this.loadpayment();
    this.empID = this.authService.emp.empID;

    setInterval(() => {
      this.loadAppointmant();
    }, 180000);
  }

  clinicSelected(id: any) {
    this.selectedClinic = id;
    this.doctorsIDs.splice(0, this.doctorsIDs.length);
    this.doctorss = this.doctors.filter(x => x.clinicID === id);
    for (const x of this.doctorss) {
      const idd = x.empID;
      const emp = this.doctorsID.findIndex(i => i.empID === (idd + ''));
      if (emp !== -1) {
        this.doctorsIDs.push(this.doctorsID[emp]);
      }
    }
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

  private loadalldoctors() {
    this.clinicService.get_clinic_doctors().subscribe(
      (res: ClinicDoctor[]) => {
        this.doctors = res;
        console.log('all docs ' + this.doctors.toString());
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadAppointmant() {
    this.appointmentService.get_appointment().subscribe(
      (res: Appointment[]) => {
        this.appointments = res;
        this.filteredAppointment = this.appointments;
      },
      (err) => {
        this.error = err;
      }, () => {
        this.loadAllPayments();
      }
    );
  }


  private loaddoctors() {
    this.employeeService.get_employee().subscribe(
      (res: Employee[]) => {
        this.doctorsID = res;
        // console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  doctorSelected(value: any) {
    this.selectedDoctor = value;
    if (this.selectedDoctor !== '-- Doctor --') {
      this.filteredAppointment = this.appointments.filter(x => x.empID.toString() === value);
      console.log(this.filteredAppointment);
    } else {
      this.filteredAppointment = this.appointments;
    }
  }

  getPaymentById(id: any) {
    const k = this.appointmentPrice.findIndex(x => x.appID === id);
    if (k !== -1) {
      return this.appointmentPrice[k].price + '';
    } else {
      return 0;
    }

  }

  getDoctorName(value: any) {
    const k = this.doctorsID.findIndex(x => x.empID === value);
    if (k !== -1) {
      return this.doctorsID[k].firstname + ' ' + this.doctorsID[k].lastname;
    }
  }

  getClinicName(value: any) {
    const k = this.clinics.findIndex(x => x.clinicID === value);
    if (k !== -1) {
      return this.clinics[k].clinicname;
    }
  }

  getCurrentModel() {
    return JSON.stringify(this.selectedDoctor + ',' + this.selectedClinic);
  }

  dateChanged() {
    // TODO: implement this function
  }

  checkin(f: Appointment) {
    const appID = f.appID;
    const i = this.appointments.findIndex(x => x.appID === appID);
    this.appointments[i].checkin = 1;
    this.update_checkin(this.appointments[i]);
    console.log(this.appointments);
    this.messageService.add({
      severity: 'success',
      summary: 'Checked IN',
      detail: appID + ''
    });
  }

  update_checkin(CurrentAppointment: any) {
    this.appointmentService.update_checkin(CurrentAppointment)
      .subscribe(
        (res: Appointment[]) => {
          this.appointments = res;
        },
        (err) => {
          this.error = err;
          this.messageService.add({
            severity: 'error',
            summary: 'Error! Try Again',
            detail: '' + err
          });
        }
      );
  }

  private loadpayment() {
    this.paymentService.get_payments().subscribe(
      (res: Payment[]) => {
        this.payments = res;
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  load_appointment_price(appID: number) {
    this.appointmentService.get_appointment_price(appID).subscribe(
      (res: any) => {
        const k = new AppointmentPrice(res.appID, res.price);
        this.appointmentPrice.push(k);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  openAddComponent(patientID: any) {
    const modalRef = this.modalService.open(PaymentPopupComponent);
    modalRef.componentInstance.title = 'Add Payment';
    modalRef.componentInstance.employeeID = this.authService.getUserId();
    modalRef.componentInstance.patientID = patientID;
  }

  private loadAllPayments() {
    this.appointments.forEach(x => this.load_appointment_price(x.appID));
  }

  printTable() {
    const printContent = document.getElementById('tablePreview');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.outerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  openUpdateComponent(x: Appointment) {
    const modalRef = this.modalService.open(PatientUpdateAppointmentComponent);
    modalRef.componentInstance.title = 'Update Appointment';
    modalRef.componentInstance.appointment = x;
  }
}
