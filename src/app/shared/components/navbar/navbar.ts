import { Component, computed, HostListener, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartService } from '../../services/cart-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TieredMenuModule, BadgeModule , OverlayBadgeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  public cartService = inject(CartService)

  isScrolled = signal(false);

  cartCount = computed(() => this.cartService.cartItems())
  mobileMenuOpen = false;
  items: MenuItem[] = [
    {
      label: 'Follow Us',
      items: [
        { label: 'Facebook', icon: 'pi pi-facebook', command: () => { console.log('Facebook clicked'); } },
        { label: 'Twitter', icon: 'pi pi-twitter', command: () => { console.log('Twitter clicked'); } },
        { label: 'Instagram', icon: 'pi pi-instagram', command: () => { console.log('Instagram clicked'); } }
      ]
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private loginService:LoginService){}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // أول check لو الصفحة اتعملها scroll قبل load
      this.isScrolled.set(window.scrollY > 100);

      // ربط الحدث بعد ما الـ DOM جاهز
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 70);
      });
    }
  }


  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }



  isLoggedIn = computed(() => this.loginService.isLoggedIn()); 

  logOut() {
    this.loginService.logOut();
  }
}
