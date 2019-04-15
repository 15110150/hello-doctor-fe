import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabComponent } from './tab.component';

const routes: Routes = [
   
    {
        path: '',
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
                path: 'user-profile',
                loadChildren: '../../pages/user-profile/user-profile.module#UserProfileComponentModule'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            }
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabPageRoutingModule { }