import { Component, signal } from '@angular/core';
import { Cards } from "../../shared/components/cards/cards";
import { ProductsService } from '../../shared/services/allprouducts';
import { ProductView } from '../../shared/interfaces/all-products';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search-pipe';

@Component({
  selector: 'app-products',
  imports: [Cards, PaginatorModule, FormsModule, SearchPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {

  searchTerm = signal<string>('')

  rows = 40;                 // هنجيب 40 منتج في الصفحة (أو أي عدد تحبه)
totalRecords = 80;         // إجمالي المنتجين (مثلاً لو عندك صفحتين = 80)
products = signal<ProductView[]>([]);

constructor(private product: ProductsService) {}

ngOnInit() {
  this.loadPage(1);       
}

loadPage(page: number) {
  this.product.getProducts(page).subscribe({
    next: res => {

      this.products.set(res);
    },
    error: err => console.error(err)
  });
}

}
