import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfousersService } from 'src/app/services/infousers.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { InfoUsersList, InfoUsers, GenderList, TypeUserList } from '../../interfaces/interfaces';

@Component({
  selector: 'app-infousers',
  templateUrl: './infousers.component.html',
  styleUrls: ['./infousers.component.css']
})
export class InfousersComponent implements OnInit {
  public _listinfousers!: InfoUsersList;
  public _genders: GenderList = [
    {
      gender_id: 1,
      name: "Masculino"
    },
    {
      gender_id: 2,
      name: "Femenino"
    }
  ];
  public _typeUsers: TypeUserList = [
    {
      type_user_id: 1,
      name: "Aceso total"
    },
    {
      type_user_id: 2,
      name: "Visualización"
    }
  ];
  public _infouserSelected: any = {};
  private nameInputs = [
    'identification',
    'password',
    'name',
    'second_name',
    'last_name',
    'second_last_name',
    'phone',
    'email',
    'address',
    'age'
  ];
  public accion: string = 'Agregar';

  formInfousers: FormGroup = this.fb.group({
    identification: ['', [Validators.required, Validators.maxLength(12)]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(40)]],
    second_name: ['', [Validators.maxLength(40)]],
    last_name: ['', [Validators.required, Validators.maxLength(80)]],
    second_last_name: ['', [Validators.maxLength(80)]],
    phone: ['', [Validators.maxLength(12)]],
    email: ['', [Validators.maxLength(120)]],
    address: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    TypeUserId: ['', [Validators.required]],
    GenderId: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private infousersService: InfousersService,
    private sweetAlert: SweetAlertService) { }

  ngOnInit(): void {
    this.findAll();
  }

  swhicheAccion() {
    switch (this.accion) {
      case "Modificar":
        this.put();
        break;
      case "Agregar":
        this.save();
        break;

      default:
        break;
    }
  }


  findAll() {
    this.infousersService.findAll()
      .subscribe(response => {
        if (response.status) {
          this._listinfousers = this.infousersService.infoUsers;
        }
      })
  }

  delete(info_user_id: number) {
    this.infousersService.delete(info_user_id)
      .subscribe(response => {
        if (response.status) {
          this.sweetAlert.alertModal('success', response.message)
          this.findAll();
          this.formInfousers.reset();
          return response.status;
        }
        this.formInfousers.reset();
        this.sweetAlert.alertModal('error', "No se puede eliminar el parque porque tiene una dependencia y/o no existe")
        return response.status;
      })
  }

  findById(info_user_id: number) {
    this.accion = "Modificar";
    this.infousersService.findById(info_user_id)
      .subscribe(response => {
        if (response.status) {
          this.sweetAlert.alertModal('success', response.message)
          this._infouserSelected = response.data;
          this.setValuesInputsUpdate();
          return response.status;
        }
        this.sweetAlert.alertModal('error', "")
        console.log(response);

        return response.status;
      })
  }

  save() {
    const { identification, password, name, second_name,
      last_name, second_last_name, phone, email, address,
      age, GenderId, TypeUserId } = this.formInfousers.value;

    this.infousersService.save(identification,
      password,
      name,
      second_name,
      last_name,
      second_last_name,
      phone,
      email,
      address,
      age,
      GenderId,
      TypeUserId)
      .subscribe((resp: any) => {
        if (resp.status == true) {
          this.sweetAlert.alertModal('success', resp.message)
          this.findAll();
          this.cancelar();
          return resp.status
        }

        this.sweetAlert.alertModal('error', resp.message)
        return resp.status
      })
  }

  setValuesInputsUpdate() {
    this.nameInputs.forEach(value => {
      this.formInfousers.controls[value].setValue(this._infouserSelected[value])
    })
    this.formInfousers.controls['TypeUserId'].setValue(this._infouserSelected.gender.gender_id);
    this.formInfousers.controls['GenderId'].setValue(this._infouserSelected.typeUser.type_user_id);
  }

  put() {
    const { identification, password, name, second_name,
      last_name, second_last_name, phone, email, address,
      age, GenderId, TypeUserId } = this.formInfousers.value;
    const info_user_id = this._infouserSelected.info_user_id;

    this.infousersService.put(info_user_id, identification, password, name, second_name,
      last_name, second_last_name, phone, email, address, age, GenderId, TypeUserId)
      .subscribe((resp: any) => {
        if (resp.status == true) {
          this.sweetAlert.alertModal('success', resp.message)
          this.findAll();
          this.cancelar();
          return resp.status
        }

        this.sweetAlert.alertModal('error', resp.message)
        return resp.status
      })
  }

  cancelar() {
    this.formInfousers.reset();
    this.accion = "Agregar";
  }

  isValid(campo: string) {
    return this.formInfousers.controls[campo].errors
      && this.formInfousers.controls[campo].touched;
  }

}
