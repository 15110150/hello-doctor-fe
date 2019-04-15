import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchComponent } from './search.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [SearchComponent]
})
export class SearchComponentModule {}
