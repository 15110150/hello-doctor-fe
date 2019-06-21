import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchComponent } from './search.component';
import { AutoCompleteModule } from 'ionic4-auto-complete';

const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'search/:id',
        component: SearchComponent
    }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchComponent]
})
export class SearchComponentModule {}
