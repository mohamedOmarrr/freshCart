import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../../shared/services/brand-service';
import { Categor } from '../../shared/interfaces/categor';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-brands',
  imports: [CarouselModule, ProgressSpinnerModule],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands {

  brands = signal<Categor[]>([])

    constructor(private brand:BrandService, private router:Router){}
  
    ngOnInit(): void {
      this.allBrands()
    }

    responsiveOptions = [
  {
    breakpoint: '768px',   
    numVisible: 1,         
    numScroll: 1
  },
  {
    breakpoint: '1024px', 
    numVisible: 3,
    numScroll: 1
  }
];

    allBrands(){

      const allowedBrands = ['defacto', 'jack & jones', 'puma', 'adidas', 'lc waikiki', 'canon'
        , 'dell', 'lenovo', 'toshiba', 'samsung', 'sony'];

      this.brand.getBrands().subscribe({
        next: res => {

        const filtered = res.filter(b =>
        allowedBrands.includes(b.name.toLowerCase())
        );

        this.brands.set(filtered);
         },
        error: err => console.error(err)
       })
    }
  
    getName(name:string){
      this.router.navigate(['/brands', name])
    }
  

}
