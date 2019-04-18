import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import {} from 'googlemaps';

const routes: Routes = [
  { path: '', redirectTo: 'address', pathMatch: 'full' },
  {
    path: 'address',
    component: MapComponent
  },
  {
    path: 'address/:id',
    //component: SearchComponent
    component: MapComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['geometry', 'places']
    })
  ],
  declarations: [ MapComponent ]
})
export class MapComponentModule {}