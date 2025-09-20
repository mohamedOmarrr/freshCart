import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
import { Signup } from './features/signup/signup';
import { Login } from './features/login/login';
import { Cart } from './features/cart/cart';
import { Categories } from './features/categories/categories';
import { Brands } from './features/brands/brands';
import { Notfound } from './features/notfound/notfound';
import { Detailes } from './features/detailes/detailes';
import { Checkout } from './features/checkout/checkout';
import { authGurdGuard } from './core/gurds/auth-gurd-guard';
import { loggedGurdGuard } from './core/gurds/logged-gurd-guard';
import { Reset } from './features/reset/reset';
import { Allorders } from './features/allorders/allorders';
import { SpecificCategory } from './features/specific-category/specific-category';
import { SpecificBrand } from './features/specific-brand/specific-brand';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home Page' },
  { path: 'products', component: Products, title: 'Products Page' },
  { path: 'sign', component: Signup, title: 'SignUp Page', canActivate: [loggedGurdGuard] },
  { path: 'log', component: Login, title: 'Login Page', canActivate: [loggedGurdGuard] },
  { path: 'reset', component: Reset, title: 'resetPasword Page'},
  { path: 'category', component: Categories, title: 'Categories Page', canActivate: [authGurdGuard] },
  { path: 'category/:name', component: SpecificCategory, title: 'Specific Categories Page', canActivate: [authGurdGuard] },
  { path: 'brand', component: Brands, title: 'Brands Page', canActivate: [authGurdGuard] },
  { path: 'brands/:name', component: SpecificBrand, title: 'Specific Brands Page', canActivate: [authGurdGuard] },
  { path: 'product/:id', component: Detailes, title: 'Detailes Page' },
  { path: 'checkout/:id', component: Checkout, title: 'Checkout Page' },
  { path: 'allorders', component: Allorders, title: 'all orders Page' },
  { path: 'cart', component: Cart, title: 'Cart Page' },
  { path: '**', component: Notfound }
];
