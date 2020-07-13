import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product';
import { mockProducts } from './products-mock';
import { mockShoppingList } from './shopping-list-mock';

import { ShoppingList } from 'models/shopping-list';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(mockProducts);
  }
  
  //TODO , move to a user service . Will move once state management is written

  getShoppingLists(): Observable<ShoppingList[]>{
    return of(mockShoppingList);
  }
}
