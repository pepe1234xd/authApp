import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      console.log('canAactivate');
      return this.authService.validarToken()
      .pipe(
        tap(valid=>{
          if(!valid){
            this.router.navigateByUrl('/auth')
          }
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean{
      console.log('canLoad');
      return this.authService.validarToken()
      .pipe(
        tap(valid=>{
          if(!valid){
            this.router.navigateByUrl('/auth')
          }
        })
      );
  }
}
