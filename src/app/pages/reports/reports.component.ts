import { Component, OnInit } from '@angular/core';
import { InfousersService } from '../../services/infousers.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { InfoUsersList, InfoUsers } from '../../interfaces/interfaces';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public _listinfousers: InfoUsersList = [];
  public infouser: any = {
    name: "",
    second_name: "",
    last_name: "",
    second_last_name: "",
    age: ""
  };
  public count_men = 0;
  public count_wouman = 0;
  public avg = 0;

  constructor(private infousersService: InfousersService,
    private sweetAlert: SweetAlertService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.infousersService.findAll()
      .subscribe(response => {
        if (response.status) {
          this._listinfousers = this.infousersService.infoUsers;
          this.calculateReports();
        }
      })
  }

  calculateReports() {
    let sum_age: number = 0;
    let mayor: number = Number(this._listinfousers[0].age);
    this.infouser = this._listinfousers[0];

    this._listinfousers.forEach(user => {
      sum_age += Number(user.age);
      this.countWoumanAndMen(user.gender.gender_id);
      if (Number(user.age) > mayor) {
        mayor = Number(user.age);
        this.infouser = user;
      }
    })
    this.avg = this.calculateAvg(sum_age, this._listinfousers.length)
  }

  countWoumanAndMen(gender_id: number) {
    if (gender_id == 1) {
      this.count_men++;
    } else {
      this.count_wouman++;
    }
  }

  calculateAvg(sum_age: number, count_users: number) {
    return sum_age / count_users;
  }

}
