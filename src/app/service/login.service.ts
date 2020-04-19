import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../component/model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    
  }
  readonly APIUrl = "http://localhost:8080/ngocanh-pilot/";
  login(username: string, password: string): Observable<Token>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ngocanh:ngocanh')
      })
    };
    const body = 'client_id=ngocanh&client_secret=ngocanh&grant_type=password&' +
      'username='+ username + '&password=' + password;

    return this.http.post<Token>(this.APIUrl + 'oauth/token', body, httpOptions);
  }
  
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLogIn(): boolean {
    if(localStorage.getItem('access_token') === null)
      return false;
    else
      return true;
  }

}
