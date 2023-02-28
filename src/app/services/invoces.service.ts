import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { InfoUsers, Response, InfoUsersList, InvoiceList } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class InvocesService {
  private baseUrl: string = environment.baseUrl;
  private _invoices!: InvoiceList;

  get infoUsers() {
    return [...this._invoices];
  }

  constructor(private http: HttpClient) { }

  delete(info_user_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/invoices/${info_user_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  findByIdUser(info_user_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/${info_user_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  save(value_totally: string, infoUserId: number) {
    return this.http.post<any>(`${this.baseUrl}/invoices`, {
      value_totally,
      infoUserId
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
