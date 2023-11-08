import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import to from 'await-to-js';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  edit: boolean = false;
  formProduct: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', Validators.required),
    date_release: new FormControl('', Validators.required),
    date_revision: new FormControl({ value: '', disabled: true }, Validators.required)
  });

  getControl(control: string): FormControl {
    return this.formProduct.get(control) as FormControl;
  }

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // TODO: Check if we have query params to complete the form and edit a product 
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.getProduct(params['id']);
    }
  }

  async getProduct(id: string) {
    const [_, resp] = await to<any, Error>(lastValueFrom(this.productsService.getProducts()));
    if (resp?.length) {
      const productList = resp as Product[];
      const product = productList.filter(p => p.id === id)[0];
      this.formProduct.patchValue({
        ...product,
        date_release: this.formatDate(product.date_release),
        date_revision: this.formatDate(product.date_revision)
      });
      this.edit = true;
    }
  }

  reset() {
    this.formProduct.reset();
  }
  async saveProduct() {

    if (this.formProduct.invalid) return;

    const body = {
      date_revision: this.addOneYear(new Date(this.getControl('date_release').value)),
      ...this.formProduct.value
    }

    let request;
    if (this.edit) {
      request = this.productsService.updateProduct(body);
    } else {
      request = this.productsService.createProduct(body);
    }

    const [_, resp] = await to(lastValueFrom(request));

    if (resp) {
      console.log(resp);
      this.reset();
      this.router.navigate(['/products']);
    }

  }

  calculateDateRelease() {
    const dateRevision = this.addOneYear(new Date(this.getControl('date_release').value));
    this.getControl('date_revision').setValue(this.formatDate(dateRevision));
  }

  addOneYear(date: Date) {
    date.setFullYear(date.getFullYear() + 1, date.getMonth() + 1, date.getDate() + 1);
    return date;
  }

  async verifyId() {
    if (!this.edit) {
      const [_, resp] = await to(lastValueFrom(this.productsService.verificationProduct(this.getControl('id').value)));
      if (resp) {
        this.getControl('id').setErrors(Validators.required)
      }
    }
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
