import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { RouterModule } from '@angular/router';
import { APP_BASE_HREF} from '@angular/common';  
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MyInterceptor } from "./shared/my-interceptor";

import {
  NgbPaginationModule,
  NgbModalModule
} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./components/menu/menu.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ArticulosComponent } from "./components/articulos/articulos.component";
import { ArticulosFamiliasComponent } from "./components/articulos-familias/articulos-familias.component";
import { ModalDialogComponent } from "./components/modal-dialog/modal-dialog.component";
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServicioService } from './services/servicio.service';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesService } from './services/clientes.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ArticulosComponent,
    ArticulosFamiliasComponent,
    ModalDialogComponent,
    ServiciosComponent,
    ClientesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'articulosfamilias', component: ArticulosFamiliasComponent }
    ]),
    NgbPaginationModule,
    NgbModalModule,
  ],
  entryComponents: [ModalDialogComponent],
  providers: [
     {provide: APP_BASE_HREF, useValue : '/' },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true, providers: [ServicioService], providers: [ClientesService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
