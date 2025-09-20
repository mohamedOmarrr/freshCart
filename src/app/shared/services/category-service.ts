import { Injectable } from '@angular/core';
import { Categor } from '../interfaces/categor';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(private http:HttpClient){}

  
    getCategory(): Observable<Categor[]> {
    return this.http.get<{ data: Categor[] }>(`${environment.baseURL}categories`).pipe(
      map(res =>
        res.data.map(p => ({
          name: p.name,
          image: p.image ?? './images/playstation.jpeg'
        }))
      )
    );
  }
  
}
