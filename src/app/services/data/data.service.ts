import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private username = 'Elli01';
  private baseUrl = `http://localhost:8080/insights/findByUsername/${this.username}`; // 🔥 Modifica con il tuo backend
  private jwtToken='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJFbGxpMDEiLCJpYXQiOjE3Mzk4MDI0NTIsImV4cCI6MTczOTg4ODg1Mn0.xmBYEnAscIs_3gPhNNNj8vDMcHuRxLXAejcv-drvRRY'

  getInsightsByUsername(): Observable<any> {
    return this.http.get(`http://localhost:8080/insights/findByUsername/${this.username}`, { headers: this.getHeaders() });
  }
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });
  }


}
