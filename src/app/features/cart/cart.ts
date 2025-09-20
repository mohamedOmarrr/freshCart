import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginService } from '../../shared/services/login-service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';   
import { CartService } from '../../shared/services/cart-service';
import { CartItem } from '../../shared/interfaces/my-cart';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-cart',
  imports: [InputNumberModule, FormsModule, ProgressSpinnerModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {

  private cartService = inject(CartService);
  private router = inject(Router);
 

  cartItems = signal<CartItem[]>([]);
  cartId = signal<string | null>(null);
  
  shipping = 20


  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(res => {
      this.cartItems.set(res.items);
      this.cartId.set(res.cartId);
    });
  }


  get subtotal(): number {
    return this.cartItems().reduce(
      (sum, item) => sum + item.count * item.product.price,
      0
    );
  }

 
  get total(): number {
    return this.subtotal + this.shipping;
  }


  updateQuantity(item: CartItem, newQty: number): void {
    item.count = newQty;
    
  }

  removeItem(id: string) {
  this.cartService.deleteCartItem(id).subscribe({
    next: (res) => {
      this.cartService.cartItems.set(res.numOfCartItems)

      this.cartItems.update(items =>
        items.filter(i => i.product._id !== id))

      if(this.cartItems().length === 0){
        this.router.navigate(['/home']);
      }  
    },
    error: err => console.error(err)
  });
}

  goCheck(){
    const id = this.cartId();
    if (id) {
      this.router.navigate(['/checkout', id]);
    }
  }

}
