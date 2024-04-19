import { Component, EventEmitter, OnDestroy, Output, TemplateRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../components/modal/modal.component";
import { SearchService } from '../../services/search.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterLink, CommonModule, ModalComponent]
})
export class NavbarComponent implements OnDestroy {


  private offcanvasService = inject(NgbOffcanvas);
  //se inyecta el servicio de CartService
  //private cartService = inject(CartService);
  totalItemsCart : number = 0;

  //NUEVO
  //itemsCart : Array<any> = [];
  // Peimbert
  itemsCart : any[] = [];
  subTotalCart : number = 0;

  // para busqueda
  /*products: any[] = [];
  body: any = {} ;
  body: any = {
    category:'AllItems',
    pageNumber: 1,
    pageSize: 6,
    criterio : ''
  }*/



  constructor(    
    public modalService: NgbModal,
    private searchService: SearchService,
    private cartService: CartService
  ){

    
    // la subscripción se hace en el constructor por única vez
    // Me subscribo al cart service para obtener el total de items del Carrito
      this.cartService.getTotalItemsCart.subscribe((totalItems:number) =>{
      console.log('El total de Items en el carrito es => ', totalItems);
      this.totalItemsCart = totalItems;
      
      });


      this.cartService.calculateSubtotal.subscribe((subTotal:any)=>{
        this.subTotalCart = subTotal;
      });

    /*  this.cartService.getProductsByCategory(this.body).subscribe({
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
          console.log("Llamada al servicio completada con éxito desde el api search");
        }
      })*/
  }

  ngOnDestroy(): void {
    this.cartService.getTotalItemsCart.unsubscribe();
    //NUEVO
    //this.cartService.getItemsCart.unsubscribe();
    this.cartService.calculateSubtotal.unsubscribe();
  }

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
    // Peimbert
    this.itemsCart = this.cartService.cartItems;
	}

  removeItem(index:number){
    if(confirm("¿Está seguro de quitar el producto?")){
      this.cartService.removeCart(index);
      console.log(this.cartService.cartItems);
    }/**/
  }


  openModal(index:number) {
    console.log("índice " + index);
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Eliminar producto del carrito';
    modalRef.componentInstance.message = "¿Está seguro de eliminar el producto del carrito?";
    modalRef.componentInstance.labelOk = "Eliminar";
    modalRef.componentInstance.labelCancel = "Cancelar";
  
    modalRef.componentInstance.onClickOk.subscribe((result: any) => {
      if (result) {
        if(result.toString() == "Eliminar"){
          console.log("result" + result);
          console.log("Eliminar " + index);
          this.cartService.removeCart(index);
        }
      }
    });
  
  }


  onSearch(criterio: string) {
    console.log("criterio desde navbar " + criterio);
    this.searchService.sendCriterio(criterio);
  /* this.body = {
      category:"AllItems",
      pageNumber: 1,
      pageSize: 6,
      criterio : search
    }
    console.log(this.body);
    this.cartService.getProductsByCategory(this.body).subscribe({
      // Este código se ejecuta de forma asíncrona
      next: (data: any) =>{
        //this.products = data;
        this.products = data.result.data;
        console.log("desde búsqueda");
        console.log(data);
      },
      error: (error: any) => {
        console.log(`Ocurrió un error en la llamada al servicio, descripción del error: ` , error)

      },
      // cuando se ejecuta todo de manera correcta, se ejecuta complete.
      complete: () => {
        console.log("Llamada al servicio completada con éxito desde el api search");
      }
    })
    console.log(search);
*/
  }
    

}
