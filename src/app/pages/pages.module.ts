import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InfousersComponent } from './infousers/infousers.component';
import { ReportsComponent } from './reports/reports.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';


@NgModule({
  declarations: [
    InfousersComponent,
    ReportsComponent,
    NavbarComponent,
    InvoicesComponent,
    InvoicesListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
