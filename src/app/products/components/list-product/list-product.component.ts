import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import to from 'await-to-js';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { LayoutModalComponent } from 'src/app/shared/components/layout-modal/layout-modal.component';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productList: Product[] = [];
  searchControl: FormControl = new FormControl('');
  quantityControl: FormControl = new FormControl(5);
  totalResult: number = 0;

  constructor(private productsService: ProductsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    const [_, resp] = await to<any, Error>(lastValueFrom(this.productsService.getProducts()));
    if (resp) {
      this.productList = resp;
      this.totalResult = this.productList?.length;
    }
  }

  updateProduct(id: string) {
    this.router.navigate(['products', 'update', id]);
  }

  async deleteProduct(product: Product) {

    this.dialog.open(LayoutModalComponent, {
      data: {
        title: 'Delete product',
        label: `Are you sure you want to remove ${product.name}?`,
        showActions: true
      }
    }).afterClosed().subscribe(async (value) => {
      if (value) {
        const [_, resp] = await to<any, Error>(lastValueFrom(this.productsService.deleteProduct(product.id)));
        this.getProducts();
      }
    });
  }

  showingResults() {
    if (this.totalResult > this.quantityControl.value) {
      return `Showing ${this.quantityControl.value} of ${this.totalResult}`
    }

    return `Showing ${this.totalResult} of ${this.totalResult}`
  }

}
