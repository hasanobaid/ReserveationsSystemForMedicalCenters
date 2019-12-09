import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AdminMenuComponent} from './admin/admin-menu/admin-menu.component';
import {AuthService} from './service/auth.service';
import {PatientListComponent} from './admin/patient-list/patient-list.component';
import {PatientProfileDetailsComponent} from './admin/patient-list/patient-profile-details/patient-profile-details.component';
import {PatientCreateComponent} from './admin/patient-create/patient-create.component';
import {PatinetSeviceService} from './service/patinet-sevice.service';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeCreateComponent} from './admin/employee-create/employee-create.component';
import {EmployeeListComponent} from './admin/employee-list/employee-list.component';
import {AppointmentListComponent} from './admin/appointment-list/appointment-list.component';
import {AppointmentCreateComponent} from './admin/appointment-create/appointment-create.component';
import {SchaduleGeneratorComponent} from './admin/schadule-generator/schadule-generator.component';
import {PatientEditDetailsComponent} from './admin/patient-list/patient-edit-details/patient-edit-details.component';
import {PatientListFullComponent} from './admin/patient-list/patient-list-full/patient-list-full.component';
import {EmployeeEditDetailsComponent} from './admin/employee-list/employee-edit-details/employee-edit-details.component';
import {EmployeeListFullComponent} from './admin/employee-list/employee-list-full/employee-list-full.component';
import {EmployeeProfileDetailsComponent} from './admin/employee-list/employee-profile-details/employee-profile-details.component';
import {ExceptionDateComponent} from './admin/exception-date/exception-date.component';
import {VacationDateComponent} from './admin/vacation-date/vacation-date.component';
import {InsuranceComponent} from './admin/insurance/insurance.component';
import {InsuranceCreateComponent} from './admin/insurance/insurance-create/insurance-create.component';
import {InsuranceUpdateComponent} from './admin/insurance/insurance-update/insurance-update.component';
import {ClinicComponent} from './admin/clinic/clinic.component';
import {ClinicCreateComponent} from './admin/clinic/clinic-create/clinic-create.component';
import {ClinicListComponent} from './admin/clinic/clinic-list/clinic-list.component';
import {ClinicDetailsComponent} from './admin/clinic/clinic-details/clinic-details.component';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import {PatientComponent} from './patient/patient.component';
import {PatientMenuComponent} from './patient/patient-menu/patient-menu.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {CalendarModule as CalendarCModule} from 'primeng/calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbActiveModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import 'flatpickr/dist/flatpickr.css';
import {ProfileComponent} from './patient/profile/profile.component';
import {NgxFileHelpersModule} from 'ngx-file-helpers';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {DoctorComponent} from './doctor/doctor.component';
import {DoctorMenuComponent} from './doctor/doctor-menu/doctor-menu.component';
import {DoctorScheduleComponent} from './doctor/doctor-schedule/doctor-schedule.component';
import {DoctorVacationComponent} from './doctor/doctor-vacation/doctor-vacation.component';
import {DoctorExceptionComponent} from './doctor/doctor-exception/doctor-exception.component';
import {DoctorServiceService} from './service/doctor-service.service';
import {ReceptionComponent} from './reception/reception.component';
import {ReceptionMenuComponent} from './reception/reception-menu/reception-menu.component';
import {AddAppointmentComponent} from './patient/add-view-appointments/add-appointment.component';
import {ClinicServiceService} from './service/clinic-service.service';
import {ClinicListFullComponent} from './admin/clinic/clinic-list-full/clinic-list-full.component';
import {AdminPaymentComponent} from './admin/admin-payment/admin-payment.component';
import {InsuranceServiceService} from './service/insurance-service.service';
import {PatientPaymentListComponent} from './patient/patient-payment-list/patient-payment-list.component';
import {ChartsModule} from 'ng2-charts';
import {ChartsComponent} from './admin/charts/charts.component';
import {MatNativeDateModule} from '@angular/material';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {SpinnerModule} from 'primeng/spinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AppoinmentServiceService} from './service/appoinment-service.service';
import {EmployeeServiceService} from './service/employee-service.service';
import {ScheduleServiceService} from './service/schedule-service.service';
import {AuthGuardService} from './service/auth-guard.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {InsuranceAddClinicsComponent} from './admin/insurance/insurance-add-clinics/insurance-add-clinics.component';
import {PaymentPopupComponent} from './admin/appointment-list/payment-popup/payment-popup.component';
import {RadioButtonModule} from 'primeng/primeng';
import {PatientAppointmentListComponent} from './patient/patient-appointment-list/patient-appointment-list.component';
import {DoctorPatientHistoryComponent} from './doctor/doctor-patient-history/doctor-patient-history.component';
import {PatientUpdateAppointmentComponent} from './patient/patient-appointment-list/patient-update-appointment/patient-update-appointment.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], data: {role: '4'}, children: [
      {path: '', component: ChartsComponent},
      {path: 'patient-create', component: PatientCreateComponent},
      {path: 'payments', component: AdminPaymentComponent},
      {
        path: 'patient-list', component: PatientListComponent, children: [
          {path: '', component: PatientListFullComponent},
          {path: ':id/edit', component: PatientEditDetailsComponent},
          {path: ':id', component: PatientProfileDetailsComponent}
        ]
      },
      {path: 'emp-create', component: EmployeeCreateComponent},
      {
        path: 'emp-list', component: EmployeeListComponent, children: [
          {path: '', component: EmployeeListFullComponent},
          {path: ':id/edit', component: EmployeeEditDetailsComponent},
          {path: ':id', component: EmployeeProfileDetailsComponent}
        ]
      },
      {path: 'app-create', component: AppointmentCreateComponent},
      {path: 'app-list', component: AppointmentListComponent},
      {path: 'sch-gen', component: SchaduleGeneratorComponent},
      {path: 'exc-date', component: ExceptionDateComponent},
      {path: 'vac-date', component: VacationDateComponent},
      {path: 'insurance', component: InsuranceComponent},
      {
        path: 'clinics', component: ClinicComponent, children: [
          {path: ':id', component: ClinicDetailsComponent},
          {path: '', component: ClinicListFullComponent}
        ]
      },
    ]
  },
  {
    path: 'patient', component: PatientComponent, canActivate: [AuthGuardService], data: {role: '1'}, children: [
      {path: '', component: PatientAppointmentListComponent},
      {path: 'home', component: PatientAppointmentListComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'add-view-appointments', component: AddAppointmentComponent},
      {path: 'payments', component: PatientPaymentListComponent}

    ]
  },
  {
    path: 'doctor', component: DoctorComponent, canActivate: [AuthGuardService], data: {role: '3'}, children: [
      {path: '', component: DoctorScheduleComponent},
      {path: 'schedule', component: DoctorScheduleComponent},
      {path: 'vacation', component: DoctorVacationComponent},
      {path: 'exception', component: DoctorExceptionComponent},
      {path: '**', component: DoctorScheduleComponent}
    ]
  },
  {
    path: 'reception', component: ReceptionComponent, canActivate: [AuthGuardService], data: {role: '2'}, children: [
      {path: '', component: ChartsComponent},
      {path: 'patient-create', component: PatientCreateComponent},
      {path: 'payments', component: AdminPaymentComponent},
      {
        path: 'patient-list', component: PatientListComponent, children: [
          {path: '', component: PatientListFullComponent},
          {path: ':id/edit', component: PatientEditDetailsComponent},
          {path: ':id', component: PatientProfileDetailsComponent}
        ]
      },
      {path: 'app-create', component: AppointmentCreateComponent},
      {path: 'app-list', component: AppointmentListComponent},
      {path: 'sch-list', component: SchaduleGeneratorComponent},
      {path: 'exc-date', component: ExceptionDateComponent},
      {path: 'vac-date', component: VacationDateComponent},
      {path: 'insurance', component: InsuranceUpdateComponent},
      {
        path: 'clinics', component: ClinicComponent, children: [
          {path: ':id', component: ClinicDetailsComponent},
          {path: '', component: ClinicListComponent}
        ]
      }
    ]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminMenuComponent,
    PatientListComponent,
    PatientProfileDetailsComponent,
    PatientCreateComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    AppointmentListComponent,
    AppointmentCreateComponent,
    SchaduleGeneratorComponent,
    PatientEditDetailsComponent,
    PatientListFullComponent,
    EmployeeEditDetailsComponent,
    EmployeeListFullComponent,
    EmployeeProfileDetailsComponent,
    ExceptionDateComponent,
    VacationDateComponent,
    InsuranceComponent,
    InsuranceCreateComponent,
    InsuranceUpdateComponent,
    ClinicComponent,
    ClinicCreateComponent,
    ClinicListComponent,
    ClinicDetailsComponent,
    PatientComponent,
    PatientMenuComponent,
    AddAppointmentComponent,
    ProfileComponent,
    DoctorComponent,
    DoctorMenuComponent,
    DoctorScheduleComponent,
    DoctorVacationComponent,
    DoctorExceptionComponent,
    ReceptionComponent,
    ReceptionMenuComponent,
    ClinicListFullComponent,
    AdminPaymentComponent,
    PatientPaymentListComponent,
    ChartsComponent,
    NotFoundComponent,
    InsuranceAddClinicsComponent,
    PaymentPopupComponent,
    PatientAppointmentListComponent,
    DoctorPatientHistoryComponent,
    PatientUpdateAppointmentComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    SchedulerModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    NgbModalModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxFileHelpersModule,
    MatFormFieldModule,
    MatInputModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarCModule,
    MultiSelectModule,
    ToastModule,
    SpinnerModule,
    MessagesModule,
    MessageModule,
    RadioButtonModule,
    NgbModule.forRoot(),
  ],
  exports: [AddAppointmentComponent],
  providers: [
    AppComponent,
    AuthService,
    PatinetSeviceService,
    DoctorServiceService,
    ClinicServiceService,
    InsuranceServiceService,
    AppoinmentServiceService,
    ScheduleServiceService,
    EmployeeServiceService,
    FormsModule,
    MatDatepickerModule,
    MessageService,
    AuthGuardService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InsuranceAddClinicsComponent,
    PaymentPopupComponent,
    PatientUpdateAppointmentComponent,
    DoctorPatientHistoryComponent
  ]
})
export class AppModule {
}
