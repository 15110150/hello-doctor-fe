import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapComponentModule' },
  { path: 'booking', loadChildren: './pages/booking/booking.module#BookingComponentModule' },
  { path: 'profile', loadChildren: './pages/user-profile/user-profile.module#UserProfileComponentModule' },
  { path: 'doctor-profile', loadChildren: './pages/doctor-profile/doctor-profile.module#DoctorProfileComponentModule' },
  { path: '', loadChildren: './pages/tab/tab.module#TabComponentModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
