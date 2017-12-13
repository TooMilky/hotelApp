import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportComponent } from './report/report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { LoginComponent } from './login/login.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { RegisterComponent } from './register/register.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { ReportService} from './shared/report.service';
import { StaffComponent } from './staff/staff.component';
import { StaffService} from './shared/staff.service';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';

import { BookingComponent } from './booking/booking.component';
import { ScheduleserviceService} from './shared/scheduleservice.service';

//Implement Api Service
import { ApiService } from './shared/api.service';
//Implement Auth Service
import { AuthService } from './shared/auth.service';
//Implement Auth Guard
import { AuthGuard } from './auth.guard';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ReportListComponent,
    ReportComponent,
    AddReportComponent,
    LoginComponent,
    RegisterComponent,
    EditReportComponent,
    ReportDetailComponent,
    StaffComponent,
    StaffListComponent,
    AddStaffComponent,
    EditStaffComponent,
    BookingComponent,
    WelcomeComponent,
    StaffDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService, AuthService, AuthGuard, ReportService, StaffService, ScheduleserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
