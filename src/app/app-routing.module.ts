import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapComponentModule' },
  { path: 'booking', loadChildren: './pages/booking/booking.module#BookingComponentModule' },
  { path: 'profile', loadChildren: './pages/user-profile/user-profile.module#UserProfileComponentModule' },
  { path: 'help-center', loadChildren: './pages/help-center/help-center.module#HelpCenterModule' },
  { path: 'doctor-profile', loadChildren: './pages/doctor-profile/doctor-profile.module#DoctorProfileComponentModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackComponentModule' },
  { path: 'detail-booking', loadChildren: './pages/detail-booking/detail-booking.module#DetailBookingModule' },
  { path: 'health-record', loadChildren: './pages/health-record/health-record.module#HealthRecordModule' },
  { path: '', loadChildren: './pages/tab/tab.module#TabComponentModule' },
  { path: '404', loadChildren: './pages/not-found-page/not-found-page.module#NotFoundPageModule'},
  { path: '**', redirectTo: '/404'}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
