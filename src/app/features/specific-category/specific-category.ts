import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/allprouducts';
import { ProductView } from '../../shared/interfaces/all-products';
import { Cards } from "../../shared/components/cards/cards";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-specific-category',
  imports: [Cards, ProgressSpinnerModule],
  templateUrl: './specific-category.html',
  styleUrl: './specific-category.scss'
})
export class SpecificCategory implements OnInit {

  categoryName!:string 
  specificProducts = signal<ProductView[]>([])

  constructor(private route:ActivatedRoute, private products:ProductsService){
    console.log('ProductsService instance:', products);
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || '';
      this.getspecificProducts(this.categoryName); 
    });
  }

 getspecificProducts(name: string) {
  console.log('Param name from route:', name);

  const page = name === 'Electronics' ? 2 : 1;

  this.products.getProducts(page).subscribe(cate => {
    console.log('Products returned:', cate);

    const filtered = cate.filter(p => p.categoryName === name);
    console.log('Filtered products:', filtered);

    this.specificProducts.set(filtered);
  });
}

}
