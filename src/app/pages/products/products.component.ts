import { Component, Input, OnDestroy, inject } from '@angular/core';
//import { MockProductsService } from '../../services/mock-products.service';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ItemListComponent, FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnDestroy{

  //productService = inject(MockProductsService);
  // se le inyecta el servicio CartService
  //cartService = inject(CartService);
  products: any[] = [];
   // para unir con la api
  criterio: any = '';
  body: any = {
    category:'AllItems',
    pageNumber: 1,
    pageSize: 18,
    criterio : this.criterio
  }

  ngSelect = "ALLITEMS";
  selectedCategory: string = "ALLITEMS";
  categories = [
    { id: "ALLITEMS", name: "All Items" },
    { id: "Classic Cars", name: "Classic Cars" },
    { id: "Motorcycles", name: "Motorcycles" },
    { id: "Trucks and Buses", name: "Trucks and Buses" },
    { id: "Vintage Cars", name: "Vintage Cars" },
    { id: "Planes", name: "Planes"}
  ];



  constructor(
    private cartService: CartService,
    private searchService : SearchService
  ){


    this.searchService.getCriterio.subscribe((criterio:string) =>{
      
      console.log("El criterio de búsqueda es " ,criterio);
      this.body.criterio = criterio == '' ? ' ' : criterio;      
      this.products = [];      
      // this.pager = {};
      this.body.pageNumber = 1;
      this.body.category= "AllItems";
      console.log(this.body);

      if(criterio != ''){
        this.selectedCategory = "ALLITEMS";
      }

      this.cartService.getProductsByCategory(this.body).subscribe({
        // Este código se ejecuta de forma asíncrona
        next: (data: any) =>{
          this.products = data.result.data;
          console.log(data);
        },
        error: (error: any) => {
          console.log(`Ocurrió un error en la llamada al servicio, descripción del error: ` , error)
  
        },
        // cuando se ejecuta todo de manera correcta, se ejecuta complete.
        complete: () => {
          console.log("Llamada al servicio completada con éxito desde el api");
        }
      })
      
    });
  //  this.cambiaseleccion("AllItems");
   /*this.cartService.getProductsByCategory(this.body).subscribe({
      // Este código se ejecuta de forma asíncrona
      next: (data: any) =>{
        this.products = data.result.data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(`Ocurrió un error en la llamada al servicio, descripción del error: ` , error)

      },
      // cuando se ejecuta todo de manera correcta, se ejecuta complete.
      complete: () => {
        console.log("Llamada al servicio completada con éxito desde el api");
      }
    })*/


    /* mock
    this.productService.getProducts().subscribe({
      // Este código se ejecuta de forma asíncrona
      next: (data: any) =>{
        this.products = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(`Ocurrió un error en la llamada al servicio, descripción del error: ` , error)

      },
      // cuando se ejecuta todo de manera correcta, se ejecuta complete.
      complete: () => {
        console.log("Llamada al servicio completada con éxito");
      }
    })*/
  }

  ngOnInit(){
    

  }
  
  ngOnDestroy(): void {
    // To Do : Recordar realizar el unsubscribe
    this.cartService.getTotalItemsCart.unsubscribe;
    this.searchService.getCriterio.unsubscribe;
  }

  agregar(args:any){
    console.log(args);
    // envía una cadena de texto
    this.cartService.addCart(args);
    console.log(this.cartService.cartItems);
  }

  verDetalle(args:any){
    console.log(args);
  }

  cambiaseleccion(categoria: any) {
    this.body = {
      category:categoria,
      pageNumber: 1,
      pageSize: 18,
      criterio : ''
    }
    
    console.log(categoria);

    this.cartService.getProductsByCategory(this.body).subscribe({
      // Este código se ejecuta de forma asíncrona
      next: (data: any) =>{
        this.products = data.result.data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(`Ocurrió un error en la llamada al servicio, descripción del error: ` , error)

      },
      // cuando se ejecuta todo de manera correcta, se ejecuta complete.
      complete: () => {
        console.log("Llamada al servicio completada con éxito desde el api");
      }
    })

  }
}
