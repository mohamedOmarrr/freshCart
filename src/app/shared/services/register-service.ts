import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authInterface, SignUpResponse } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http:HttpClient){

  }

  signUp(data:authInterface):Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${environment.baseURL}auth/signup`, data)
  }
  
}
