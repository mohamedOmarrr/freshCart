import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { authInterface, SignUpResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

isLoggedIn = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn.set(!!this.getToken());
    }
  }

  login(data: SignUpResponse): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${environment.baseURL}auth/signin`, data).pipe(
      tap((res) => {
        if (res && isPlatformBrowser(this.platformId)) {
          this.document.cookie = `access_token=${res.token};path=/;`;
          this.isLoggedIn.set(true);
        }
      })
    );
  }

getToken(): string | null {
  if (!isPlatformBrowser(this.platformId)) return null;

  const cookies = this.document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(c => c.length > 0);

  const tokenCookie = cookies.find(c => c.startsWith('access_token='));
  if (!tokenCookie) return null

  const token = tokenCookie.split('=')[1];

  return token || null;
}

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      this.isLoggedIn.set(false);
    }
  }

}
