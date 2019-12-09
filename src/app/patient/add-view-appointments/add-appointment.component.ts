import {Component, OnInit} from '@angular/core';
import {Employee} from '../../models/employee.model';
import {Clinic} from '../../models/clinic.model';
import {Appointment} from '../../models/appointment.model';
import {ClinicDoctor} from '../../models/clinic-doctor.model';
import {Patient} from '../../models/patient.model';
import {Schadule} from '../../models/schedule.model';
import {ClinicServiceService} from '../../service/clinic-service.service';
import {AppoinmentServiceService} from '../../service/appoinment-service.service';
import {PatinetSeviceService} from '../../service/patinet-sevice.service';
import {EmployeeServiceService} from '../../service/employee-service.service';
import {ScheduleServiceService} from '../../service/schedule-service.service';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
})
export class AddAppointmentComponent implements OnInit {

  patientID = 0;
  patient: Patient;

  empID = '';
  selectedClinic: any;
  selectedDoctor: any;

  appointments: Appointment[];
  appointment = new Appointment(0, 0, 0, 0, 0, '', '');


  AllApoin: Appoin[] = [];

  doctors: ClinicDoctor[];
  doctorss: ClinicDoctor[];

  clinics: Clinic[];
  error = '';
  success = '';
  patients: Patient[];
  date5: Date;

  minDate = new Date();
  maxDate = new Date();

  doctorsID: Employee[] = [];
  doctorsIDs: Employee[] = [];

  doctorsSchedule: Schadule[] = [];
  doctorsSchedules: Schadule[] = [];

  invalidDates: Array<Date> = [];
  slots: Appointment[];

  constructor(private clinicService: ClinicServiceService,
              private appointmentService: AppoinmentServiceService,
              private patinetservice: PatinetSeviceService,
              private employeeService: EmployeeServiceService,
              private scheduleService: ScheduleServiceService,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.patientID = +this.authService.getUserId();
      this.appointment.patientID = this.patientID;
    }

    // load stuff here
    this.loaddoctors();
    this.loadSchedule();
    this.loadalldoctors();
    this.loadAppointmant();
    this.loadClinics();
    this.loadpatient();
    this.maxDate.setFullYear(this.minDate.getFullYear(), this.minDate.getMonth() + 11, this.minDate.getDay());
    this.appointment.rempID = 0;
  }

  filterDates() {

    let invalidDates = [];
    const validDates = [];

    let startDate;
    let endDate;
    for (const i of this.doctorsSchedules) {
      const days = [i.sun, i.mon, i.tue, i.wen, i.thu, i.fri, i.sat];
      startDate = new Date(i.startdate);
      endDate = new Date(i.enddate);

      let temp = new Date(startDate.getTime());
      while (temp.getTime() <= endDate.getTime()) {
        if (days[temp.getDay()].toString() === '1') {
          validDates.push(temp);
        }
        temp = new Date(temp.getTime());
        temp.setDate(temp.getDate() + 1);
      }
      console.log(validDates);
    }

    // set random start and end dates.
    const start = new Date();
    const end = new Date();

    end.setFullYear(start.getFullYear(), start.getMonth() + 11, start.getDay());

    // move over [start ---> end] and fill all dates as invalid.
    let tempDate = new Date(start.getTime());
    while (tempDate.getTime() < end.getTime()) {
      invalidDates.push(tempDate);
      tempDate = new Date(tempDate.getTime());
      tempDate.setDate(tempDate.getDate() + 1);
    }

    invalidDates = invalidDates.filter((invalidDate) => !validDates.find(
      validDate => validDate.getDate() === invalidDate.getDate()));

    this.invalidDates = invalidDates;
  }

  getCurrentModel() {
    return JSON.stringify(this.appointment);
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

  setDateFormat() {
    let x = '';
    x += this.date5.getFullYear();
    if (this.date5.getMonth() < 10) {
      x += '-0' + (this.date5.getMonth() + 1);
    } else {
      x += '-' + (this.date5.getMonth() + 1);
    }
    if (this.date5.getDate() < 10) {
      x += '-0' + this.date5.getDate();
    } else {
      x += '-' + this.date5.getDate();
    }
    this.appointment.adate = x;
    console.log(this.appointment.adate);
  }

  setTimeSlots() {
    this.setDateFormat();

    for (const k of this.doctorsSchedules) {
      const startTimeHours = +(k.starttime.split(':')[0]);
      const startTimeMinutes = +(k.starttime.split(':')[1]);
      console.log(startTimeHours + ':' + startTimeMinutes);

      const endTimeHours = +(k.endtime.split(':')[0]);
      const endTimeMinutes = +(k.endtime.split(':')[1]);
      console.log(endTimeHours + ':' + endTimeMinutes);

      const slotLength = +(k.slot);
      const numSlots = ((endTimeHours - startTimeHours) * 60) / slotLength;
      console.log(slotLength);

      let tempStartTimeHours = startTimeHours;
      let tempStartTimeMinutes = startTimeMinutes;
      let tempEndTimeHours;
      let tempEndTimeMinutes;

      for (let i = 0; i < numSlots; i++) {
        tempEndTimeMinutes = tempStartTimeMinutes + slotLength;
        tempEndTimeHours = tempStartTimeHours;


        if (tempEndTimeMinutes >= 60) {
          tempEndTimeMinutes = tempEndTimeMinutes - 60;
          tempEndTimeHours = tempEndTimeHours + 1;
        }

        let t1 = '';
        if (tempStartTimeHours < 10) {
          t1 += '0' + tempStartTimeHours;
        } else {
          t1 += tempStartTimeHours;
        }
        t1 += ':';
        if (tempStartTimeMinutes < 10) {
          t1 += '0' + tempStartTimeMinutes;
        } else {
          t1 += tempStartTimeMinutes;
        }

        let t2 = '';
        if (tempEndTimeHours < 10) {
          t2 += '0' + tempEndTimeHours;
        } else {
          t2 += tempEndTimeHours;
        }
        t2 += ':';
        if (tempEndTimeMinutes < 10) {
          t2 += '0' + tempEndTimeMinutes;
        } else {
          t2 += tempEndTimeMinutes;
        }


        this.AllApoin.push(
          {
            start: t1,
            end: t2
          }
        );

        tempStartTimeMinutes = tempEndTimeMinutes;
        tempStartTimeHours = tempEndTimeHours;
        if (tempStartTimeMinutes >= 60) {
          tempStartTimeMinutes = tempStartTimeMinutes - 60;
          tempStartTimeHours++;
        }

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
      },
      (err) => {
        this.error = err;
      }
    );
  }

  add_appointment(f) {
    this.appointmentService.add_appointment(this.appointment)
      .subscribe(
        (res: Appointment[]) => {
          // Update the list of cars
          this.appointments = res;
          this.messageService.add({
            severity: 'success',
            summary: 'Created Successfully',
            detail: ''
          });
          // Reset the form
          f.reset();
          this.AllApoin = [];
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

  private loadpatient() {
    this.patinetservice.get_patient().subscribe(
      (res: Patient[]) => {
        this.patients = res;
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private loadSchedule() {
    this.scheduleService.get_schedule().subscribe(
      (res: Schadule[]) => {
        this.doctorsSchedule = res;
        console.log('ww ' + res);
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
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  doctorSelected(value: any) {
    this.selectedDoctor = value;
    console.log(this.doctorsSchedules);
    // clear temp array
    this.doctorsSchedules.splice(0, this.doctorsSchedules.length);

    this.doctorsSchedules = this.doctorsSchedule.filter(x =>
      (x.clinicID.toString() === this.selectedClinic) && (x.empID.toString() === this.selectedDoctor));

    console.log(this.doctorsSchedules);

    this.filterDates();
    this.loadslot();

  }

  private loadslot() {
    this.appointmentService.getslots(this.selectedDoctor, this.selectedClinic).subscribe(
      (res: Appointment[]) => {
        this.slots = res;
        console.log(this.slots);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private isNotReserved(slot: Appoin) {
    return this.slots.find(x => x.slottime.split(':')[0] === slot.start.split(':')[0]
      && x.slottime.split(':')[1] === slot.start.split(':')[1]
      && x.adate === this.appointment.adate);
  }

  validateForm() {
    if (this.appointment.clinicID === 0
      || this.appointment.empID === 0
      || this.appointment.adate === ''
      || this.appointment.slottime === '') {
      return true;
    } else {
      return false;
    }
  }
}

interface Appoin {
  start: string;
  end: string;
}
