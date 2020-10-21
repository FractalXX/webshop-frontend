import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable()
export class ApiHttpClient {

  constructor(
    private httpClient: HttpClient,
    private apiUrl: string,
  ) {
  }

  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + endPoint, options);
  }

  public post<T>(endPoint: string, params?: any, options?: IRequestOptions): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl + endPoint, params, options);
  }

  public put<T>(endPoint: string, params?: any, options?: IRequestOptions): Observable<T> {
    return this.httpClient.put<T>(this.apiUrl + endPoint, params, options);
  }

  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.httpClient.delete<T>(this.apiUrl + endPoint, options);
  }
}
