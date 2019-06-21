import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabComponent} from './tab.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {
    path: 'main',
    component: TabComponent,
    children: [
      {
        path: 'home',
        loadChildren: '../../pages/home/home.module#HomePageModule',
        canActivate: [AuthGuard], 
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
        path: 'mail-box',
        loadChildren: '../../pages/mail-box/mail-box.module#MailBoxModule'
      },
      {
        path: 'account',
        loadChildren: '../../pages/menu-account/menu-account.module#MenuAccountComponentModule'
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
