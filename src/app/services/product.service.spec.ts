import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { ProductListComponent } from '../product-list/product-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from '../app.component';


describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, ProductListComponent, HttpClientTestingModule, MatToolbarModule],
      providers: [ProductService, provideHttpClient, provideHttpClientTesting]
    });
    
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the API', () => {
    const mockProducts: Product[] = [
      { 
        id: 1, 
        title: 'Product 1', 
        price: 19.99, 
        description: 'Description for Product 1', 
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/1.jpg'
      },
      { 
        id: 2, 
        title: 'Product 2', 
        price: 29.99, 
        description: 'Description for Product 2', 
        category: 'clothing',
        image: 'https://fakestoreapi.com/img/2.jpg'
      }
    ];

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(2);
    });

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  it('should handle errors when the API fails', () => {
    service.getProducts().subscribe({
      next: () => fail('Should have failed with 404 error'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});