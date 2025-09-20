import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../shared/services/user-service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.html',
  styleUrl: './allorders.scss'
})
export class Allorders implements OnInit {

  userId: string | null = null;
  orders = signal<any>([]);


  constructor(private userService: UserService) {}


   ngOnInit(): void {
    this.userId = this.userService.getUserIdFromToken();
    console.log('User ID from token:', this.userId);
    if(!this.userId) return
    this.userService.getOrders(this.userId).subscribe({
      
    next: (res) => {
      this.orders.set(res);
      console.log('Orders:', this.orders);
    },
    error: (err) => console.error(err)
  });
  }

}
