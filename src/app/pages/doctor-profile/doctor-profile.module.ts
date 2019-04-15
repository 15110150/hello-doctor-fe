import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DoctorProfileComponent } from './doctor-profile.component';

const routes: Routes = [
  {
    path: 'doctor/:id',
    component: DoctorProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorProfileComponent]
})
export class DoctorProfileComponentModule {}
