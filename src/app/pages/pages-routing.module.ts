import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfousersComponent } from './infousers/infousers.component';
import { ReportsComponent } from './reports/reports.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'infousers',
        component: InfousersComponent
      },
      {
        path: 'invoices/:info_user_id',
        component: InvoicesComponent
      },
      {
        path: 'invoices',
        component: InvoicesListComponent
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
