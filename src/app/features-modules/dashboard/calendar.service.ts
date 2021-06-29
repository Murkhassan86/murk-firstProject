import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  uri = `${environment.baseUrl}/event`;
  constructor(
    private http: HttpClient
  ) { }

createEvent(payload?: any) {
return this.http.post(`${this.uri}`, payload)
.pipe(
  catchError(err => {
    return of ({ success: false, error: err});
  })
)
}

getEvent() {
  return this.http.get(`${this.uri}`)
  .pipe(
    catchError(err => {
      return of ({ success: false, error: err});
    })
  )
}
}
