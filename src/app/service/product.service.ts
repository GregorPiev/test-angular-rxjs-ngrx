import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../model/product';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  static BASE_URL: string = 'http://localhost:3000/';

  private productEditSource = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  productEdit = this.productEditSource.asObservable();

  public sendProductToUpdate(id: number) {
    this.productEditSource.next(id);
  }

  preloadProducts(): Observable<Product[]> {
    return this.http
      .get(ProductService.BASE_URL + 'product')
      .pipe(map((products: Product[]) => products));
  }

  getProduct(id: any): Observable<Product> {
    return this.http.get<Product>(ProductService.BASE_URL + `product/${id}`);   
  }  

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(ProductService.BASE_URL + 'product', product);
  }

  async deleteProduct(id: number | string): Promise<any> {
    return await this.http.delete(ProductService.BASE_URL + `product/${id}`)
      .toPromise()
      .then(response => {        
        return response;
      })
      .catch(this.handleError);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(ProductService.BASE_URL + `product/${product.id}`, product)
  }

  updateProductOne(id: string | number, changes: Partial<Product>): Observable<any> {
    return this.http.put(ProductService.BASE_URL + `product/${id}`, changes);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error);
  }


}
