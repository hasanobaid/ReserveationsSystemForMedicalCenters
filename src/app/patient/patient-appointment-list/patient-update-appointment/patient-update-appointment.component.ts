import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../../models/appointment.model';
import {Schadule} from '../../../models/schedule.model';
import {ScheduleServiceService} from '../../../service/schedule-service.service';
import {AuthService} from '../../../service/auth.service';
import {AppoinmentServiceService} from '../../../service/appoinment-service.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-patient-update-appointment',
  templateUrl: './patient-update-appointment.component.html',
  styleUrls: ['./patient-update-appointment.component.css']
})
export class PatientUpdateAppointmentComponent implements OnInit {
  title = 'Update Appointment';

  @Input() appointment;

  invalidDates: Array<Date> = [];
  minDate = new Date();
  maxDate = new Date();
  date = new Date();

  AllApoin: Appoin[] = [];
  slots: Appointment[] = [];
  doctorsSchedules: Schadule[] = [];
  appointments: Appointment[];
  error = '';
  success = '';

  constructor(public activeModal: NgbActiveModal,
              private scheduleService: ScheduleServiceService,
              private appointmentService: AppoinmentServiceService,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadSchedule();
    this.loadSlots();
    this.maxDate.setFullYear(this.minDate.getFullYear(), this.minDate.getMonth() + 11, this.minDate.getDay());
  }

  Update() {
    this.appointmentService.update_appointment(this.appointment)
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

  private loadSchedule() {
    this.scheduleService.get_schedule().subscribe(
      (res: Schadule[]) => {
        this.doctorsSchedules = res;
        this.doctorsSchedules = this.doctorsSchedules.filter(x => x.empID === this.appointment.empID);
        console.log(this.doctorsSchedules);
      },
      (err) => {

      }, () => {
        this.filterDates();
      }
    );
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

  setTimeSlots() {
    this.setDateFormat();
    this.AllApoin.splice(0, this.AllApoin.length);

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

  isNotReserved(slot: Appoin) {
    return this.slots.find(x => x.slottime.split(':')[0] === slot.start.split(':')[0]
      && x.slottime.split(':')[1] === slot.start.split(':')[1]
      && x.adate === this.appointment.adate);
  }

  private setDateFormat() {
    this.appointment.adate = this.authService.setDateFormat(this.date);
  }

  getCurrentModel() {
    return JSON.stringify(this.appointment);
  }

  private loadSlots() {
    this.appointmentService.getslots(this.appointment.empID, this.appointment.clinicID).subscribe(
      (res: Appointment[]) => {
        this.slots = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}

interface Appoin {
  start: string;
  end: string;
}
