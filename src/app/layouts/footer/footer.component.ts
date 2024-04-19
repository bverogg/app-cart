import { CommonModule } from '@angular/common';
import { Component, OnDestroy, TemplateRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy{
  private cartService = inject(CartService);
  subTotalCart : number = 0;

  constructor(){
    this.cartService.calculateSubtotal.subscribe((subTotal:any)=>{
      this.subTotalCart = subTotal;
    });
  }



  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
    this.cartService.calculateSubtotal.unsubscribe();
  }

}


