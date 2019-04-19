import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabComponent} from './tab.component';

const routes: Routes = [

  {
    path: 'main',
    component: TabComponent,
    children: [
      {
        path: 'home',
        loadChildren: '../../pages/home/home.module#HomePageModule'
      },
      {
        path: 'search',
        loadChildren: '../../pages/search/search.module#SearchComponentModule'
      },
      {
        path: 'list-booking',
        loadChildren: '../../pages/list-booking/list-booking.module#ListBookingComponentModule'
      },
      {
        path: 'chat',
        loadChildren: '../../pages/search/search.module#SearchComponentModule'
      },
      {
        path: 'profile',
        loadChildren: '../../pages/user-profile/user-profile.module#UserProfileComponentModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main/home'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main/home'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabPageRoutingModule {
}
