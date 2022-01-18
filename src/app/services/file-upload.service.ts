import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  private baseUrl = 'http://localhost:8080/api/v1/file';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    let headers = new HttpHeaders();

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    let headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}/userFiles`,{

    });
  }

  analyse(fileName : string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json')
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post(`${this.baseUrl}/analyse`, {
      fileName,
    },httpOptions );
  }

  delete(fileName : string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json')
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post(`${this.baseUrl}/delete`, {
      fileName,
    },httpOptions );
  }

}
