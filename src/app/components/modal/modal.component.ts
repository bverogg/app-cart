import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnDestroy{
  @Input({required :true}) title?: string;
  @Input({required :true}) message?: string;
  @Input({required :true}) labelOk?: string;
  @Input({required :true}) labelCancel?: string;

  @Output() onClickOk : EventEmitter<string> = new EventEmitter<string>();
  @Output() onClickCancel : EventEmitter<string> = new EventEmitter<string>();


  constructor(
    //public activeModal: NgbActiveModal
    public activeModalService: NgbActiveModal
  ){}

  clickButtonOk(){
    //this.onClickButton1.emit('Se pulso el boton 1');
    //this.onClickOk.emit(item);
    //console.log("Item seleccionado" + item);
     //this.clickButtonOk('Eliminar');
     this.onClickOk.emit('Eliminar');
     //console.log("Eliminar");
     this.activeModalService.close();
  }
  clickButtonCancel(){
    //this.onClickCancel.emit('Se pulso el boton 2');
    this.onClickCancel.emit('Cancelar');
    this.activeModalService.close();
  }

  ngOnDestroy(): void {
    // To Do : Recordar realizar el unsubscribe
  }

  close(){
    this.activeModalService.close();
  }

}
