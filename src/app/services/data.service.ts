import { Injectable } from '@angular/core';
import { HOST_PORT } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs' 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    console.log('error occurred!');
    return throwError(error);
  }  

  insertTodo(obj): Observable<any>{
    return this.http.post<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/inserttodo', obj)
    .pipe(catchError(this.handleError));
  }
  
  editTodo(obj): Observable<any>{
    return this.http.put<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/edittodo', obj)
    .pipe(catchError(this.handleError));
  }

  getAllTodos(obj): Observable<any>{
    return this.http.post<any>('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/getalltodos', obj)
    .pipe(catchError(this.handleError));
  }

  deleteTodo(obj): Observable<any>{
    return this.http.post('http://' + HOST_PORT.HOST + ':' + HOST_PORT.PORT + '/api/deletetodo/', obj);
  }

}
 