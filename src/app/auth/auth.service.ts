import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable ()

    export class AuthService {
      private token: any;
        private tokenTimer: any;
        private isAuthenticated = false;
        private authStatusListener = new Subject<boolean>();
uri = environment.baseUrl;
        constructor(
            private http: HttpClient,
            private router: Router
        ){
            
        }
        getToken() {
            return this.token;
          }
        
          getIsAuth() {
            return this.isAuthenticated;
          }
        
          getAuthStatusListener() {
            return this.authStatusListener.asObservable();
          }
        
        createUser(payload?: any) {
            // const authData: AuthData = {email: email, password: password}
           return this.http.post(`${this.uri}/signup`, payload)
           .pipe(
              //  map((data: any) => {
              //   console.log(data.expiresIn);
              //  }),
               catchError( err => {
                   return of ({ success: false, error: err });
               })
           )
        }

        loadSignUpUser() {
          return this.http.get(`${this.uri}/signup`)
          .pipe(
            catchError(err => {
              return of ({ success: false, error: err});
            })
          )
        }

        deletesignUpUser(selectedID) {
          return this.http.delete(`${this.uri}/signup/${selectedID}`)
          .pipe(
            catchError(err => {
              return of ({ success: false, error: err});
           
         })
          )
        }

        login(payload?: any) {
            return this.http.post(`${this.uri}/login`, payload)
            .pipe(
                catchError(err => {
                    return of ({ success: false, error: err});
                })
            )
        }

        loadUsers() {
          return this.http.get(`${this.uri}/login`)
          .pipe(
            catchError(err => {
              return of ({ success: false, error: err});
            })
          )
        }

        deleteUser(selectedID) {
          return this.http.delete(`${this.uri}/login/${selectedID}`)
          .pipe(
            catchError(err => {
              return of ({ success: false, error: err});
            })
          )
        }

        // login(payload?: any) {
        //   return this.http.post<{ token: string, expiresIn: number }>(`${this.uri}/login`, payload)
        //   .pipe(
        //       map(response => {
        //         if (response) {
        //             const token = response.token;
        //             this.token = token;
        //             if (token) {
        //                 const expiresInDuration = response.expiresIn;
        //                 this.setAuthTimer(expiresInDuration);
        //                 this.isAuthenticated = true;
        //                 this.authStatusListener.next(true);
        //                 const now = new Date();
        //                 const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        //                 console.log(expirationDate);
        //                 this.saveAuthData(token, expirationDate);
        //                 this.router.navigate(['signup']);
    
        //             }
        //         }
        //       })
        //   )  
        // //   .subscribe(response => {
        // //         const token = response.token;
        // //         this.token = token;
        // //         if (token) {
        // //             const expiresInDuration = response.expiresIn;
        // //             this.setAuthTimer(expiresInDuration);
        // //             this.isAuthenticated = true;
        // //             this.authStatusListener.next(true);
        // //             const now = new Date();
        // //             const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        // //             console.log(expirationDate);
        // //             this.saveAuthData(token, expirationDate);
        // //             this.router.navigate(['signup']);

        // //         }

        // //     })
        // }

        
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    // this.tokenTimer = setTimeout(() => {
    //   this.logout();
    // }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toDateString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

            logout() {
                window.localStorage.clear();
                this.router.navigate([ '/login' ]);
                return  this.http.get( this.uri + '/logout');
                // this.token = null;
                // this.isAuthenticated = false;
                // this.authStatusListener.next(false);
                // clearTimeout(this.tokenTimer);
                // this.clearAuthData();
                // this.router.navigate(["/"]);
              }
            
    }