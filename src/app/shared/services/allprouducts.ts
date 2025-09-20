import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiProduct, ProductView } from '../interfaces/all-products';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(private http: HttpClient) {}

  getProducts(pages:number = 1): Observable<ProductView[]> {
    return this.http.get<{ data: ApiProduct[] }>(`${environment.baseURL}products?page=${pages}`).pipe(
      map(res =>
        res.data.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          rate: p.ratingsAverage,
          categoryName: p.category?.name ?? 'Unknown',
          image: p.images?.[0] ?? './images/playstation.jpeg',
          brand: p.brand?.name ?? 'Unknown'
        }))
      )
    );
  }

getSpecificProduct(id: string): Observable<ProductView> {
  return this.http.get<{ data: ApiProduct }>(`${environment.baseURL}products/${id}`).pipe(
    map(res => ({
      id: res.data.id,
      title: res.data.title,
      price: res.data.price,
      rate: res.data.ratingsAverage,
      categoryName: res.data.category?.name ?? 'Unknown',
      images: res.data.images ?? ['./images/playstation.jpeg'],
      brand: res.data.brand?.name ?? 'Unknown',
      desc: res.data.description,
      quantity: res.data.quantity ?? 0
    }))
  );
}
}
