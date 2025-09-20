import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/allprouducts';
import { ProductView } from '../../shared/interfaces/all-products';
import { Cards } from "../../shared/components/cards/cards";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-specific-brand',
  imports: [Cards, ProgressSpinnerModule],
  templateUrl: './specific-brand.html',
  styleUrl: './specific-brand.scss'
})
export class SpecificBrand implements OnInit {

  brandName!:string 
  specificBrands = signal<ProductView[]>([])

  constructor(private route:ActivatedRoute, private products:ProductsService){
    console.log('ProductsService instance:', products);
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      this.brandName = params.get('name') || '';
      this.getspecificProducts(this.brandName); 
      console.log(this.brandName);
      
    });
  }

 getspecificProducts(name: string) {
  console.log('Param name from route:', name);

  const page2Names = ['dell', 'lenovo', 'toshiba', 'samsung', 'sony']

  const page = page2Names.includes(name.toLowerCase()) ? 2 : 1;  

  console.log('name.toLowerCase():', name.toLowerCase());
  console.log('Array to match:', page2Names);
  console.log('Page chosen:', page);

  this.products.getProducts(page).subscribe(cate => {
    console.log('Products returned:', cate);

    const filtered = cate.filter(
      p => p.brand?.toLowerCase() === name.toLowerCase()
    );
    console.log('Filtered products:', filtered);

    this.specificBrands.set(filtered);
  });
}


}
