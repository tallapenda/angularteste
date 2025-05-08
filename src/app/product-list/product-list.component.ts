import { Component, OnInit } from '@angular/core';
import { Product, SortDirection } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, FormsModule, MatFormFieldModule,
     MatInputModule, ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule, MatCardModule],
  standalone: true,
  providers: [],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts$: Observable<Product[]>;
  loading = true;
  error = '';
  
  searchControl = new FormControl('');
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private sortDirectionSubject = new BehaviorSubject<SortDirection>(SortDirection.Ascending);
  
  constructor(private productService: ProductService) {
    // Combine products, search and sort direction to get filtered products
    this.filteredProducts$ = combineLatest([
      this.productsSubject,
      this.searchControl.valueChanges.pipe(startWith('')),
      this.sortDirectionSubject
    ]).pipe(
      map(([products, searchTerm, sortDirection]) => {
        // First filter by search term
        let filtered = products;
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = products.filter(product => 
            product.title.toLowerCase().includes(term)
          );
        }
        
        // Then sort
        return this.sortProducts(filtered, sortDirection);
      })
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.productsSubject.next(products);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  toggleSortDirection(): void {
    const newDirection = this.sortDirectionSubject.value === SortDirection.Ascending 
      ? SortDirection.Descending 
      : SortDirection.Ascending;
    this.sortDirectionSubject.next(newDirection);
  }

  getSortDirectionIcon(): string {
    return this.sortDirectionSubject.value === SortDirection.Ascending 
      ? 'arrow_upward' 
      : 'arrow_downward';
  }

  private sortProducts(products: Product[], direction: SortDirection): Product[] {
    return [...products].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return direction === SortDirection.Ascending ? comparison : -comparison;
    });
  }
}