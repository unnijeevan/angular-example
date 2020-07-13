import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'models/product';
import { ShoppingList } from 'models/shopping-list';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  shoppingLists: ShoppingList[] = [];
  selectedProduct: Product;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    forkJoin(
      this._productService.getProducts(),
      this._productService.getShoppingLists()
    )
    .subscribe(
      result => {
        this.products = result[0];
        this.shoppingLists = result[1];
      }
    );
  }

  addToShoppingList(product:Product): void {
     this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = undefined;
  }
  
  //mocking now . This should be a post call .
  addNewList(event): void {
    this.shoppingLists = [...this.shoppingLists, { id: (this.shoppingLists.length + 1) + '', productIds:[ this.selectedProduct.id],name: event.detail }];
  }

   //mocked, also complex logic. Needs unit test
   //basically add or remove the product from shopping list
  updateShoppingList(event): void {
    let newOptions = event.detail as ShoppingList[];
    if(!newOptions)
     newOptions = [];

    this.shoppingLists.map(l => {
      if(newOptions.indexOf(l) === -1)
       l.productIds = l.productIds.filter(i => i !== this.selectedProduct.id);
      else if(l.productIds.indexOf(this.selectedProduct.id) === -1)
       l.productIds = [...l.productIds, this.selectedProduct.id];       
    });
  }

  get selectedOptions(): ShoppingList[] {
    return this.shoppingLists.filter(l => l.productIds.indexOf(this.selectedProduct.id) !== -1);
  }
}
