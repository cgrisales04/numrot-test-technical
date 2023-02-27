import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfousersComponent } from './infousers/infousers.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'infousers',
        component: InfousersComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: '**',
        redirectTo: 'infousers'
      }
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
