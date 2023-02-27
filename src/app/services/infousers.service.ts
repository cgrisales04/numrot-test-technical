import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { InfoUsers, Response, InfoUsersList } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfousersService {
  private baseUrl: string = environment.baseUrl;
  private _infoUsuarios!: InfoUsersList;

  get infoUsers() {
    return [...this._infoUsuarios];
  }

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/infousers`)
      .pipe(
        map((resp: any) => {
          this._infoUsuarios = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  delete(info_user_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/infousers/${info_user_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  findById(info_user_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/infousers/${info_user_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  save(identification: string, password: string, name: string, second_name: string,
    last_name: string, second_last_name: string, phone: string, email: string,
    address: string, age: string, GenderId: string, TypeUserId: string) {
    return this.http.post<any>(`${this.baseUrl}/infousers`, {
      identification,
      password,
      name,
      second_name,
      last_name,
      second_last_name,
      phone,
      email,
      address,
      age,
      TypeUserId,
      GenderId
    })
      .pipe(
        tap(resp => {
          if (resp.status) {
            return resp;
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      )
  }

  put(info_user_id: string, identification: string, password: string, name: string, second_name: string,
    last_name: string, second_last_name: string, phone: string, email: string,
    address: string, age: string, GenderId: string, TypeUserId: string) {
    return this.http.put<any>(`${this.baseUrl}/infousers/${info_user_id}`, {
      identification,
      password,
      name,
      second_name,
      last_name,
      second_last_name,
      phone,
      email,
      address,
      age,
      TypeUserId,
      GenderId
    })
      .pipe(
        tap(resp => {
          if (resp.status) {
            return resp;
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      )
  }
}
