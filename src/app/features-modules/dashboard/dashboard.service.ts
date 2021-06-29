import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
uri = `${environment.baseUrl}/userInfo`;
  constructor(
    private http: HttpClient
  ) { }

  createUserInfo(payload?: any) {
    return this.http.post(`${this.uri}`, payload)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  getUserInfo() {
    return this.http.get(`${this.uri}`)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  deleteUserInfo(selectedID) {
    return this.http.delete(`${this.uri}/${selectedID}`)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  updateUserInfo(payload?: any) {
    return this.http.put(`${this.uri}`, payload)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  //create rejection reason
  createReason(payload?: any) {
    return this.http.post(`${this.uri}/reason`, payload)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  } 

  loadReason() {
    return this.http.get(`${this.uri}/reason`)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }


}
