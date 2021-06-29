import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BucketService {
  uri =  `${environment.baseUrl}/bucket`;
  constructor(
    private http: HttpClient
  ) { }

  createBucket(category?: any, price?: any, size?: any, color?: any, fabric?: any, age?: any, description?: any, agreement?: any, image?: File, UserId?: any, status?: any, createdAt?: any, bucketIndex?: any) {
    // const UserId = window.localStorage.getItem("loggedInUserId");
    const bucketData = new FormData();
    bucketData.append("category", category);
    bucketData.append("price", price);
    bucketData.append("color", color);
    bucketData.append("fabric", fabric);
    bucketData.append("age", age);
    bucketData.append("description", description);
    bucketData.append("size", size);
    bucketData.append("agreement", agreement);
    bucketData.append("image", image);
    bucketData.append("UserId", UserId);
    bucketData.append('status', status);
    bucketData.append('createdAt', createdAt);
    bucketData.append('bucketIndex', bucketIndex);
    // const payload = bucketData? {bucket: bucketData} : {createdBy: UserId}
    return this.http.post(`${this.uri}`, bucketData)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  loadBucket(userID?: any) {
    return this.http.get(`${this.uri}`)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  updateBucket(payload?: any) {
    return this.http.put(`${this.uri}`, payload)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }

  deleteBucket(selectedID?: any) {
    return this.http.delete(`${this.uri}/${selectedID}`)
    .pipe(
      catchError(err => {
        return of ({ success: false, error: err});
      })
    )
  }
}
