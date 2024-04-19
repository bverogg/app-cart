import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
//import { ModalComponent } from "./components/modal/modal.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    //imports: [RouterOutlet, HeaderComponent, FooterComponent, NavbarComponent, ModalComponent]
    imports: [RouterOutlet, HeaderComponent, FooterComponent, NavbarComponent]
})
export class AppComponent {
  title = 'app-cart';
}
