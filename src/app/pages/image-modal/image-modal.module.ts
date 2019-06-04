import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavParams } from '@ionic/angular';

import { ImageModalComponent } from './image-modal.component';

const routes: Routes = [
    {
        path: '',
        component: ImageModalComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    providers: [NavParams],
    declarations: [ImageModalComponent]
})
export class ImageModalModule { }
