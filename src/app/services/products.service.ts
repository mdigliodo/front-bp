import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/interfaces/product.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  APU_URL: string = environment.api_url;

  constructor(private http: HttpClient) { }

  getProducts = () => {
    return this.http.get(`${this.APU_URL}bp/products`).pipe(
      catchError(this.handleError)
    );
  }

  createProduct = (product: Product) => {
    return this.http.post(`${this.APU_URL}bp/products`, product, {}).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct = (product: Product) => {
    return this.http.put(`${this.APU_URL}bp/products`, product).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct = (idProduct: string) => {
    return this.http.delete(`${this.APU_URL}bp/products?id=${idProduct}`).pipe(
      catchError(this.handleError)
    );
  }

  verificationProduct = (idProduct: string) => {
    return this.http.get(`${this.APU_URL}bp/products/verification?id=${idProduct}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
