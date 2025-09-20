import { Routes } from '@angular/router';
import { authGurdGuard } from './core/gurds/auth-gurd-guard';
import { loggedGurdGuard } from './core/gurds/logged-gurd-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    title: 'Home Page'
  },
  { path: 'products',
    loadComponent: () => import('./features/products/products').then(m => m.Products),
    title: 'Products Page'
  },
  { path: 'sign',
    loadComponent: () => import('./features/signup/signup').then(m => m.Signup),
    title: 'SignUp Page',
    canActivate: [loggedGurdGuard]
  },
  { path: 'log',
    loadComponent: () => import('./features/login/login').then(m => m.Login),
    title: 'Login Page',
    canActivate: [loggedGurdGuard]
  },
  { path: 'reset',
    loadComponent: () => import('./features/reset/reset').then(m => m.Reset),
    title: 'resetPasword Page'
  },
  { path: 'category',
    loadComponent: () => import('./features/categories/categories').then(m => m.Categories),
    title: 'Categories Page',
    canActivate: [authGurdGuard]
  },
  { path: 'category/:name',
    loadComponent: () => import('./features/specific-category/specific-category').then(m => m.SpecificCategory),
    title: 'Specific Categories Page',
    canActivate: [authGurdGuard]
  },
  { path: 'brand',
    loadComponent: () => import('./features/brands/brands').then(m => m.Brands),
    title: 'Brands Page',
    canActivate: [authGurdGuard]
  },
  { path: 'brands/:name',
    loadComponent: () => import('./features/specific-brand/specific-brand').then(m => m.SpecificBrand),
    title: 'Specific Brands Page',
    canActivate: [authGurdGuard]
  },
  { path: 'product/:id',
    loadComponent: () => import('./features/detailes/detailes').then(m => m.Detailes),
    title: 'Detailes Page'
  },
  { path: 'checkout/:id',
    loadComponent: () => import('./features/checkout/checkout').then(m => m.Checkout),
    title: 'Checkout Page'
  },
  { path: 'allorders',
    loadComponent: () => import('./features/allorders/allorders').then(m => m.Allorders),
    title: 'all orders Page'
  },
  { path: 'cart',
    loadComponent: () => import('./features/cart/cart').then(m => m.Cart),
    title: 'Cart Page'
  },
  {
    path: '**',
    loadComponent: () => import('./features/notfound/notfound').then(m => m.Notfound)
  }
];
