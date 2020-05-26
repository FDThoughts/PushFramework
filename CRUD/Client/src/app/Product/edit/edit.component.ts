import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  nameText: string;
  priceText: number;
  quantityText: number;

  constructor(private service: ProductService
    , private router: Router
  ) {
  }

  onSubmit() {
    let product: Product = new Product(
      0,
      this.nameText, 
      this.priceText, 
      this.quantityText
    );
    this.service.createProduct(product);
    this.router.navigateByUrl('/product');
  }

}
