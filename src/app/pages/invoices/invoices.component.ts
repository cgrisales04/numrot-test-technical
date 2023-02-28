import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { InfousersService } from '../../services/infousers.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { InvoiceList } from '../../interfaces/interfaces';
import { InvocesService } from '../../services/invoces.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  public _infouserSelected: any = {
    gender: {
      name: ""
    },
    typeUser: {
      name: ""
    }
  };
  public _invoices: InvoiceList = [];

  constructor(private activate_route: ActivatedRoute,
    private infousersService: InfousersService,
    private invoiceService: InvocesService,
    private sweetAlert: SweetAlertService) { }

  ngOnInit(): void {
    this.activate_route.params
      .pipe(
        switchMap(({ info_user_id }) => this.infousersService.findById(info_user_id))
      )
      .subscribe((info_user_selected) => {
        if (info_user_selected.status) {
          this.sweetAlert.alertModal('success', info_user_selected.message);
          this._infouserSelected = info_user_selected.data;
          this.findById(this._infouserSelected.info_user_id);

        } else {
          this.sweetAlert.alertModal('success', info_user_selected.message);
        }
      })
  }

  findById(info_user_id: number) {
    this.invoiceService.findByIdUser(info_user_id)
      .subscribe(response => {
        if (response.status) {
          this._invoices = response.data;
          return response.status;
        }
        this.sweetAlert.alertModal('error', response.message)
        return response.status;
      })
  }






}
