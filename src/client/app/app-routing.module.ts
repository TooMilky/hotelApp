import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Report Component
import { ReportListComponent } from './report-list/report-list.component';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';

// Staff Component
import { StaffComponent } from './staff/staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';

import { BookingComponent } from './booking/booking.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report-detail',
    component: ReportDetailComponent,
  },
  {
    path: 'report-detail/:_id',
    component: ReportDetailComponent
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff-detail',
    component: StaffDetailComponent,
  },
  {
    path: 'staff-detail/:_id',
    component: StaffDetailComponent
  },
  {
    path: 'staff-list',
    component: StaffListComponent,
  },
  {
    path: 'new-staff',
    component: AddStaffComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: AddReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-report',
    component: EditReportComponent
  },
  {
    path: 'edit-report/:_id',
    component: EditReportComponent
  },
  {
    path: 'edit-staff',
    component: EditStaffComponent
  },
  {
    path: 'edit-staff/:_id',
    component: EditStaffComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


