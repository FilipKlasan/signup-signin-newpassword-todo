import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs' 


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }
  
  handleError(error: HttpErrorResponse) {
     console.log('error occurred!');
     return throwError(error);
  }
  
  intercept(req, next){
    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
       setHeaders: {
         Authorization: `Bearer ${authService.getToken()}`
       }
    });
    
    return next.handle(tokenizedReq).pipe(catchError(this.handleError));
  }

}
