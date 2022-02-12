import { Injectable } from '@angular/core';
import { Observable, of, throwError, VirtualTimeScheduler } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ApiService } from './api.service';

import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const apiUrl = environment.backendServer + '/api/';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(
    private http: HttpClient
  ) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public _call(params: {
    type: string;
    url: string;
    content?: any;
  }): Observable<any> {
    const type = params.type.toLowerCase();
    let HTTP = null;

    switch (type) {
      case 'get':
      case 'delete':
        HTTP = this.http[type](apiUrl + params.url);
        break;
      case 'post':
      case 'put':
        HTTP = this.http[type](apiUrl + params.url, params.content, httpOptions);
        break;
    }
    HTTP.pipe(
      tap()
      , catchError((err: any, caught: Observable<any>) => {
        console.error(err, caught);
        this.handleError(err);
        return of(caught as any);
      })
    );
    return HTTP;
  }
  public _get(url: string): Observable<any> {
    return this._call({ type: 'get', url });
  }
  public _post(url: string, content?: any): Observable<any> {
    return this._call({ type: 'post', url, content });
  }
  public _put(url: string, content?: any): Observable<any> {
    return this._call({ type: 'put', url, content });
  }
  public _delete(url: string): Observable<any> {
    return this._call({ type: 'delete', url });
  }
  public DEBUG(...args: any): void {
    console.log('AJAXService Debug', args);
  }
}
