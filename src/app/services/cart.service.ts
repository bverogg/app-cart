import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//const API_URL : string = `http://localhost:3000/api/cart/v1`;
const API_URL : string = `http://carrito.edu.mx/api/cart/v1`;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // variable de arreglos
  cartItems: any[] = [];
  // BehaviorSubject es un observable, cualquier componente puede ser alcanzado
  getTotalItemsCart:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //NUEVO
  //getItemsCart:BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  calculateSubtotal:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // para unir con la base de datos
  constructor(private http: HttpClient) {  }

  // equivalente a la llamada de postman
  getProductsByCategory(body: any){
    return this.http.post(`${API_URL}/getProductsByCategory`,body);
  }

  addCart(item:any){
    this.cartItems.push(item);
    this.getTotalItemsCart.next(this.cartItems.length);
    // se envía en la función el llamado de la función que regresa el valor del subtotal
    this.calculateSubtotal.next(this._calculateSubtotal());
    //this.getItemsCart.next(this.cartItems);
  }
  removeCart(index:number){
    //eliminar el item de acuerdo a ese index, y solo 1 elemento a partir del índice.
    this.cartItems.splice(index,1);
    this.getTotalItemsCart.next(this.cartItems.length);
    // se envía en la función el llamado de la función que regresa el valor del subtotal
    this.calculateSubtotal.next(this._calculateSubtotal());
    //this.getItemsCart.next(this.cartItems);
  }

  private _calculateSubtotal():number{
    // función que acumula los productos del carrito, los suma
    return this.cartItems.reduce((accumulator,currentItem)=>{
      return accumulator + currentItem.unitPrice;
    },0);
    return 0;
  }


}
