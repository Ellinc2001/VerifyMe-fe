import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityTriggersService {

  private apiUrl = 'http://localhost:8080/identity-triggers';
  private jwtToken='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJFbGxpMDEiLCJpYXQiOjE3NDA0MDM0ODEsImV4cCI6MTc0MDQ4OTg4MX0.MPONhS_W68Cs4KGLA7C1CgFUsEMy3y8Ly7J71MpV9VQ'

  constructor(private http: HttpClient) {}

  getIdentityTriggers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-all`,  { headers: this.getHeaders() });
  }

  addIdentityTrigger(trigger: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, trigger);
  }

  deleteIdentityTrigger(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

    private getHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Authorization': `Bearer ${this.jwtToken}`,
        'Content-Type': 'application/json'
      });
    }
}
