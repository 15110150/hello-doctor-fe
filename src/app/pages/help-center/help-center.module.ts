import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HelpCenterComponent } from './help-center.component';

const routes: Routes = [
    {
        path: '',
        component: HelpCenterComponent,
        
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HelpCenterComponent]
})
export class HelpCenterModule { }
