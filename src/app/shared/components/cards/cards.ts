import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductView } from '../../interfaces/all-products';
import { CartService } from '../../services/cart-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-cards',
  imports:[ToastModule, MessageModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss'],
})
export class Cards {
  products = input<ProductView[]>();


  constructor(private router: Router,
     private cartService: CartService,
     private messageService:MessageService,
    private log:LoginService,) {}

  gitId(event: MouseEvent, id?: string): void {
   
    if ((event.target as HTMLElement).closest('button')){
      
      event.stopPropagation()
      return
    } 

    if (id) {
      this.router.navigate(['/product', id]);
    }
  }

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
