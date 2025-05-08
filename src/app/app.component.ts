import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductListComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Product Catalog</span>
      <span class="toolbar-spacer"></span>
      <button mat-icon-button aria-label="Shopping cart">
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button mat-icon-button aria-label="User account">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>
    
    <app-product-list></app-product-list>
  `,
  styles: [`
    .toolbar-spacer {
      flex: 1 1 auto;
    }
    
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
  `]
})
export class AppComponent {
  title = 'Product Catalog';
}
