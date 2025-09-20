import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StripeSession } from '../interfaces/pay';
import { environment } from '../../../environments/environment';
import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http:HttpClient, private log:LoginService){}



  goSession(id:string, form:object):Observable<StripeSession >{
    const cleanId = id.trim();

    const token = this.log.getToken();

    const headers: HttpHeaders = new HttpHeaders(
      token ? { token } : {}
    );
    
    const front = environment.frontURL.replace(/\/$/, '');

    return this.http
      .post<{ session: StripeSession }>(
        `${environment.baseURL}orders/checkout-session/${encodeURIComponent(cleanId)}?url=${encodeURIComponent(front)}`,
        form,
        { headers }
      )
      .pipe(
        map(res => res.session)
      );
  }  
  
}
