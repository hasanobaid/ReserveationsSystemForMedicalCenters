import {Component, OnInit} from '@angular/core';
import {Appointment} from '../../models/appointment.model';
import {ClinicDoctor} from '../../models/clinic-doctor.model';
import {Clinic} from '../../models/clinic.model';
import {Employee} from '../../models/employee.model';
import {Schadule} from '../../models/schedule.model';
import {ClinicServiceService} from '../../service/clinic-service.service';
import {AppoinmentServiceService} from '../../service/appoinment-service.service';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {EmployeeServiceService} from '../../service/employee-service.service';
import {ScheduleServiceService} from '../../service/schedule-service.service';
import {MessageService} from 'primeng/api';
import {PaymentServiceService} from '../../service/payment-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../service/auth.service';
import {PatientUpdateAppointmentComponent} from './patient-update-appointment/patient-update-appointment.component';

@Component({
  selector: 'app-patient-appointment-list',
  templateUrl: './patient-appointment-list.component.html',
  styleUrls: ['./patient-appointment-list.component.css']
})
export class PatientAppointmentListComponent implements OnInit {

  doctorID = '';
  error = '';
  success = '';

  fromdate = new Date();
  todate = new Date();

  selectedClinic: any;
  selectedDoctor: any;
  // appointments: Appointment[];
//  filteredAppointment: Appointment[] = [];
  appointment: Appointment[];
  doctors: ClinicDoctor[];
  doctorss: ClinicDoctor[];

  clinics: Clinic[];

  doctorsID: Employee[] = [];
  doctorsIDs: Employee[] = [];

  doctorsSchedule: Schadule[] = [];
  doctorsSchedules: Schadule[] = [];

  patientID = 0;
  fromdates = '';

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
    if (this.authService.isAuth()) {
      this.patientID = +this.authService.getUserId();
      this.loaddoctors();
      this.loadalldoctors();
      this.fromdates = this.authService.setDateFormat(this.fromdate);
      this.loadAppointmant(this.patientID, this.fromdates);
      this.loadClinics();

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

  private loadAppointmant(patientID: number, fromdate: string) {
    this.appointmentService.get_patientAppointmnet(patientID, fromdate).subscribe(
      (res: Appointment[]) => {
        this.appointment = res;
        console.log(this.appointment);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loaddoctors() {
    this.employeeService.get_employee().subscribe(
      (res: Employee[]) => {
        this.doctorsID = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getClinicName(value: any) {
    const k = this.clinics.findIndex(x => x.clinicID === value);
    if (k !== -1) {
      return JSON.stringify(this.clinics[k].clinicname);
    }
  }

  dateChanged(fromdate: any) {
    console.log(fromdate);
    this.loadAppointmant(this.patientID, fromdate);
  }

  // TODO: Ahmad implement this
  canUpdate(adate: string) {
    return true;
  }

  openUpdateComponent(x: Appointment) {
    const modalRef = this.modalService.open(PatientUpdateAppointmentComponent);
    modalRef.componentInstance.title = 'Update Appointment';
    modalRef.componentInstance.appointment = x;
  }

  // TODO: implement this
  cancelAppointment(x: Appointment) {
    this.appointmentService.delete_appointment(x)
      .subscribe(
        (res: Appointment[]) => {
          // Update the list of cars
          this.appointment = res;
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted Successfully',
            detail: ''
          });
          // Reset the form
          // this.AllApoin = [];
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
}
