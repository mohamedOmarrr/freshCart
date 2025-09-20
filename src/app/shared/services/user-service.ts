import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   constructor(private http:HttpClient, private log:LoginService){}

  getUserIdFromToken(): string | null {
    const token = this.log.getToken();
    if (!token) return null; 

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.id || null;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  getOrders(id:string): Observable<any> {
  
  return this.http.get<any>(`${environment.baseURL}orders/user/${id}`);
  }
  
}
