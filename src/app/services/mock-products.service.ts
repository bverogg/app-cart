import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_API = 'assets/data/products.json'
//const URL_API = 'http://localhost:3000/api/getAllProducts'

@Injectable({
  providedIn: 'root'
})
export class MockProductsService {

  constructor(private http: HttpClient) { }
// métodos para devolver información
getProducts(){
    return this.http.get(`${URL_API}`);
  }
}
