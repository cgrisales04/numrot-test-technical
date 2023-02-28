import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfousersService } from 'src/app/services/infousers.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { InfoUsersList, InfoUsers, GenderList, TypeUserList, InvoiceList } from '../../interfaces/interfaces';
import { InvocesService } from '../../services/invoces.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit {

  public _listInvoices: InvoiceList = [];

  public _listUsers: InfoUsersList = [];

  constructor(
    private infousersService: InfousersService,
    private invoiceService: InvocesService,
    private sweetAlert: SweetAlertService,
    private fb: FormBuilder,) { }

  formInvoices: FormGroup = this.fb.group({
    value_totally: ['', [Validators.required]],
    infoUserId: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.findInfoUsers();
    this.findInvoices();
  }

  findInvoices() {
    this.invoiceService.findAll()
      .subscribe(response => {
        if (response.status) {
          this._listInvoices = response.data;
          return response.status;
        }
        this.sweetAlert.alertModal('error', response.message)
        return response.status;
      })
  }

  findByInfoUserId(info_user_id: number) {
    const infoUser: InfoUsers | undefined = this._listUsers.find(infoUser => infoUser.info_user_id == info_user_id);
    return `${infoUser?.name} ${infoUser?.second_name} ${infoUser?.last_name} ${infoUser?.second_last_name}`;
  }

  findInfoUsers() {
    this.infousersService.findAll()
      .subscribe(response => {
        if (response.status) {
          this._listUsers = response.data;
          return response.status;
        }
        this.sweetAlert.alertModal('error', response.message)
        return response.status;
      })
  }

  save() {
    const { value_totally, infoUserId } = this.formInvoices.value;
    this.invoiceService.save(value_totally, infoUserId)
      .subscribe((resp: any) => {
        if (resp.status == true) {
          this.sweetAlert.alertModal('success', resp.message)
          this.findInvoices();
          this.cancelar();
          return resp.status
        }

        this.sweetAlert.alertModal('error', resp.message)
        return resp.status
      })
  }


  delete(invoice_id: number) {
    this.invoiceService.delete(invoice_id)
      .subscribe(response => {
        if (response.status) {
          this.sweetAlert.alertModal('success', response.message)
          this.findInvoices();
          this.formInvoices.reset();
          return response.status;
        }
        this.formInvoices.reset();
        this.sweetAlert.alertModal('error', "No se puede eliminar el parque porque tiene una dependencia y/o no existe")
        return response.status;
      })
  }

  cancelar() {
    this.formInvoices.reset();
  }

  isValid(campo: string) {
    return this.formInvoices.controls[campo].errors
      && this.formInvoices.controls[campo].touched;
  }
}
