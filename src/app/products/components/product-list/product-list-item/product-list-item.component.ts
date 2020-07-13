import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'models/product';
import { ShoppingList } from 'models/shopping-list';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  @Input('shopping-lists') shoppingLists: ShoppingList[];

  @Output() addToShoppingList: EventEmitter<Product> = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }

  addToList(): void {
    this.addToShoppingList.emit(this.product);
  }

}
