import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categor } from '../interfaces/categor';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient){}

  
    getBrands(): Observable<Categor[]> {
    return this.http.get<{ data: Categor[] }>(`${environment.baseURL}brands`).pipe(
      map(res =>
        res.data.map(p => ({
          name: p.name,
          image: p.image ?? './images/playstation.jpeg'
        }))
      )
    );
  }
}
