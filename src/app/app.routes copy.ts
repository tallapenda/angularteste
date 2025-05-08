import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/listproduits' },
  { path: 'listproduits', component: ProductListComponent },
];
