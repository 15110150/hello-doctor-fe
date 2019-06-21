import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DetailNotificationComponent } from './detail-notification.component';

const routes: Routes = [
  {
    path: '/detail-notifi',
    component: DetailNotificationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailNotificationComponent]
})
export class DetailNotificationModule {}
