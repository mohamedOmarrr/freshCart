import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddToCartResponse, CartApiResponse, CartItem } from '../interfaces/my-cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<number>(0)

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
      if(isPlatformBrowser(this.platformId)){

        const match = this.document.cookie.match(/cartCount=(\d+)/);
        if (match) {
          this.cartItems.set(+match[1]);
        }
        effect(() => {
             const value = this.cartItems();
             this.document.cookie = `cartCount=${value}; path=/; max-age=${7*24*60*60}`;
         });
      }

   }



  private getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const cookies = this.document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(Boolean);

    const tokenCookie = cookies.find(c => c.startsWith('access_token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  addToCart(id: string): Observable<AddToCartResponse> {
    const token = this.getToken();
    const headers: HttpHeaders = new HttpHeaders(
      token ? { token } : {}
    );

    return this.http.post<AddToCartResponse>(
      `${environment.baseURL}cart`,
      { "productId":id },
      { headers }
    );
  }



  getCartItems(): Observable<{ cartId: string; items: CartItem[] }> {

    const token = this.getToken();
    const headers: HttpHeaders = new HttpHeaders(
      token ? { token } : {}
    );

    return this.http.get<CartApiResponse>(`${environment.baseURL}cart`, { headers } ).pipe(
      map(res => ({
        cartId: res.data._id, // ← cartId
        items: res.data.products.map(p => ({
          _id: p._id,
          count: p.count,
          product: {
            _id: p.product._id,
            title: p.product.title,
            quantity: p.product.quantity,
            imageCover: p.product.imageCover,
            price: p.price
          }
        }))
      }))
    );
}

  deleteCartItem(itemId: string): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ token }) : undefined;
    return this.http.delete(`${environment.baseURL}cart/${itemId}`, { headers });
  }
}
