import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  uri =  `${environment.baseUrl}/delivery`;
  constructor(
    private http: HttpClient
  ) { }

  createDelivery(payload?: any) {
    return this.http.post(`${this.uri}`, payload )
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  getDeliveryInfo() {
    return this.http.get(`${this.uri}`)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  updateDelivery(payload?: any) {
    return this.http.put(`${this.uri}`, payload)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }
}
