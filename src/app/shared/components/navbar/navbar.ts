import { Component, computed, ElementRef, HostListener, Inject, inject, PLATFORM_ID, signal, ViewChild} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  public router = inject(Router)

  @ViewChild('navBar', { static: false }) navBar!:ElementRef
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

  @HostListener('document:click',['$event'])
  handelClick(event:MouseEvent){
    if(!isPlatformBrowser(this.platformId))  return
    if (!this.mobileMenuOpen || !this.navBar) return;
    const target = event.target as HTMLElement;
    if(!this.navBar.nativeElement.contains(target)){
      this.mobileMenuOpen = false
    }
  }
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

  handelCart(event:Event){
    if (this.router.url === '/cart'){
      event.preventDefault()
      this.router.navigate(['/home'])
    }
  }



  isLoggedIn = computed(() => this.loginService.isLoggedIn()); 

  logOut() {
    this.loginService.logOut();
  }
}
