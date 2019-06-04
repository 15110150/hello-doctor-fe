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
  { path: 'doctor-profile', loadChildren: './pages/doctor-profile/doctor-profile.module#DoctorProfileComponentModule' },
  { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackComponentModule' },
  { path: 'health-record', loadChildren: './pages/health-record/health-record.module#HealthRecordModule' },
  { path: '', loadChildren: './pages/tab/tab.module#TabComponentModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
