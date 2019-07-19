import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST_PORT } from '../config';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs' 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email: string;

  constructor(private http: HttpClient, private router: Router) { }
   
  handleError(error: HttpErrorResponse) {
    console.log('error occurred!');
    return throwError(error);
  }  

  logIn(obj): Observable<any>{
     return this.http.post<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/login', obj)
     .pipe(catchError(this.handleError));
  }

  loggedIn(){
    return !!localStorage.getItem('fzx');
  }

  logOut(){
    localStorage.removeItem('fzx');
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
  
  newPassword(obj): Observable<any>{
    return this.http.put<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/newpassword', obj)
    .pipe(catchError(this.handleError));
  }

  registration(obj): Observable<any>{
    return this.http.post<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/registration', obj)
    .pipe(catchError(this.handleError));
  }

  emailAndUsernameVerification(obj): Observable<any>{
    return this.http.post<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/emailandusernameverification', obj)
    .pipe(catchError(this.handleError));
  }
  emailVerificationNewPassword(obj): Observable<any>{
    return this.http.post<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/emailverificationnewpassword', obj)
    .pipe(catchError(this.handleError));
  }

  getToken(){
    return localStorage.getItem('fzx');
  }

  setEmail(email){
    this.email = email;
  }
  
  getEmail(): string{
    return this.email;
  }

}
