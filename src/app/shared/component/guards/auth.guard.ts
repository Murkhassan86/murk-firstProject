import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,

    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkLogin(state.url);
    } 

    checkLogin(url: string): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        }

        // else navigate to login page
        this.router.navigate(['/login'] , {queryParams : { returnUrl: url }});
        return false;
    }
}