import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MailBoxComponent } from './mail-box.component';

const routes: Routes = [
  {
    path: '',
    component: MailBoxComponent,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MailBoxComponent]
})
export class MailBoxModule {}
