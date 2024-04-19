import { Component, EventEmitter, Input, OnDestroy, Output, inject, input } from '@angular/core';
//import { MockProductsService } from '../../services/mock-products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnDestroy{
  // recibirá todos los datos para llenar la lista o cards
  @Input({required:true}) listItems : any;
  // de entrada los textos de los botones
  @Input() labelButton1?: string;
  @Input() labelButton2?: string;
  // de salida los eventos click de los botones
  @Output() onClickButton1 : EventEmitter<string> = new EventEmitter<string>();
  @Output() onClickButton2 : EventEmitter<string> = new EventEmitter<string>();



  constructor(){}
  
  clickButton1(item: any){
    //this.onClickButton1.emit('Se pulso el boton 1');
    this.onClickButton1.emit(item);
  }
  clickButton2(){
    this.onClickButton2.emit('Se pulso el boton 2')
  }

  ngOnDestroy(): void {
    // To Do : Recordar realizar el unsubscribe
  }
 

  
}


