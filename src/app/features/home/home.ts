import { Component, signal } from '@angular/core';
import { Cards } from "../../shared/components/cards/cards";
import { ProductsService } from '../../shared/services/allprouducts';
import { ProductView } from '../../shared/interfaces/all-products';
import { PaginatorModule } from 'primeng/paginator';
import { Categor } from '../../shared/interfaces/categor';
import { CategoryService } from '../../shared/services/category-service';
import { CarouselCate } from '../../shared/components/carousel-cate/carousel-cate'
import { CarouselModule } from 'primeng/carousel';;

@Component({
  selector: 'app-home',
  imports: [Cards, PaginatorModule, CarouselCate, CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  smallImages = [
    './images/banner1.webp',
    './images/tshirt-banner.jpg'
  ];

  largeImages = [
    './images/slider-image-3.jpeg',
    './images/slider-image-1.jpeg',
    './images/slider-image-2.jpeg',
  ];

rows = 40;               
totalRecords = 80;      

categories = signal<Categor[]>([]);
products = signal<ProductView[]>([]);

constructor(private product: ProductsService, private categoryService:CategoryService) {}

ngOnInit() {
  this.categoryService.getCategory().subscribe(res => {
      this.categories.set(res);
    });


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
