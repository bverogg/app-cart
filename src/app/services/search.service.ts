import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  getCriterio:BehaviorSubject<string>= new BehaviorSubject<string>('');

  constructor() { }

  sendCriterio(criterio:string){
    console.log("criterio en service " , criterio);
    this.getCriterio.next(criterio);
  }
}
