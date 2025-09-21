import { Component, OnInit, signal, Signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductsService } from '../../shared/services/allprouducts';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductView } from '../../shared/interfaces/all-products';
import { CartService } from '../../shared/services/cart-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginService } from '../../shared/services/login-service';

@Component({
  selector: 'app-detailes',
  imports: [CarouselModule, ToastModule, MessageModule, ProgressSpinnerModule],
  templateUrl: './detailes.html',
  styleUrl: './detailes.scss'
})
export class Detailes implements OnInit {

  Product = signal<ProductView | null>(null)

  constructor(private product:ProductsService,
     private route:ActivatedRoute,
    private router:Router, 
    private cartService: CartService,
    private messageService:MessageService,
    private log:LoginService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
          console.log('All params:', params.keys);
    console.log('id param raw:', params.get('id'));
      const id = params.get('id');
      console.log('Parsed id:', id);
      if (id) {
        this.product.getSpecificProduct(id)
            .subscribe(data => {
             this.Product.set(data);
            })
              
            
      }
    });
  }

  products = new Array(5).fill({});

  responsiveOptions = [
  {
    breakpoint: '1199px',   // أكبر من 1199px
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '991px',    // من 992px لحد 1199px
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '767px',    // أقل من 768px
    numVisible: 1,
    numScroll: 1
  }
];


  addToCart(id?: string): void { 
    if(this.log.isLoggedIn() === false){
      this.router.navigate(['/log'],{
        state:{
          toast:{
            severity: 'error',
            summary:'Fail add to cart',
            detail:'you must log in before add any product'
          }
        }
      })
    }

    if (!id) return;

    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.cartService.cartItems.set(res.numOfCartItems)
        this.messageService.add({
            severity: 'success',
            summary: 'Success Process',
            detail: 'Product add to Cart successfully',
          });
      },
      error: (err) => console.error(err),
    });
  }
}
