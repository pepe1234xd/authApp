import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baserUrl: string = enviroment.baseUrl;
  private _user!: Usuario;

  get usuario(){
    return {...this._user};
  }

  constructor( private http:HttpClient) { }

  registro(name:string, email:string, password:string){
    const url = `${this.baserUrl}/auth/new`;
    const body={name, email, password};
    
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp=>{
        if(resp.ok){
          localStorage.setItem('token',resp.token!);
        }
      }),
      map(resp=> resp.ok),
      catchError(err=> of(err.error.msg) )
    )
  }

  login(email:string, password:string){

    const url = `${this.baserUrl}/auth`;
    const body={email, password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp=>{
        if(resp.ok){
          localStorage.setItem('token',resp.token!);
        }
      }),
      map(resp=> resp.ok),
      catchError(err=> of(err.error.msg) )
    )
  }

  validarToken():Observable<boolean>{

    const url = `${this.baserUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');
    
    return this.http.get<AuthResponse>(url,{headers})
    .pipe(
      map(resp=> {
        
        localStorage.setItem('token',resp.token!);
          this._user= {
            name:resp.name!,
            uid:resp.uid!,
            email: resp.email!
          }
        return resp.ok
      }),
      catchError(err=> of(false))
    );
  }

  logOut(){
    localStorage.removeItem('token');
  }

}
