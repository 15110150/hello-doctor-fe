import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HealthRecordComponent } from './health-record.component';

const routes: Routes = [
  {
    path: 'record/:bookId',
    component: HealthRecordComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HealthRecordComponent]
})
export class HealthRecordModule {}
