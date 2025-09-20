import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authInterface } from '../interfaces/auth';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http:HttpClient){}

  forgetPass(email:string): Observable<authInterface>{
    return this.http.post<authInterface>(`${environment.baseURL}auth/forgotPasswords`, email)
  }

  verifyCode(resetCode:string): Observable<authInterface>{
    return this.http.post<authInterface>(`${environment.baseURL}auth/verifyResetCode`, {resetCode})
  }

  rePass(data:authInterface): Observable<authInterface>{
    return this.http.put<authInterface>(`${environment.baseURL}auth/resetPassword`, data)
  }
  
}
