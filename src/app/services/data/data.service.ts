import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private username = 'Elli01';
  private urlInsights = `http://localhost:8080/insights/findByUsername/${this.username}`; // 🔥 Modifica con il tuo backend
  private jwtToken='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJFbGxpMDEiLCJpYXQiOjE3NDA0MDM0ODEsImV4cCI6MTc0MDQ4OTg4MX0.MPONhS_W68Cs4KGLA7C1CgFUsEMy3y8Ly7J71MpV9VQ'
  private urlContents = 'http://localhost:8080/detected-content/get-contents-by-username'; // Modifica con il tuo backend

  getInsightsByUsername(): Observable<any> {
    return this.http.get(this.urlInsights, { headers: this.getHeaders() });
  }

  getDetectedContents(): Observable<any> {
    return this.http.get(this.urlContents, { headers: this.getHeaders() });
  }
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });
  }


}
