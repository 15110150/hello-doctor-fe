import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DetailPromotionComponent } from './detail-promotion.component';

const routes: Routes = [
  {
    path: '/detail-promotion',
    component: DetailPromotionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailPromotionComponent]
})
export class DetailPromotionModule {}
