import { Injectable } from "@angular/core";

import {HttpClient} from "@angular/common/http";
import { of } from "rxjs";
import {Observable} from "rxjs";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  private clientesUrl = 'https://demo3151356.mockable.io/clientes/';
  //resourceUrl: string;
  constructor(private httpClient: HttpClient) {
  //this.resourceUrl = "http://demo3151356.mockable.io/clientes/";
  }

  getClientes(): Observable<Cliente[]>{return this.httpClient.get<Cliente[]>(this.clientesUrl)};

  // get() {
  //   let params = new HttpParams();

  //   return this.httpClient.get(this.clientesUrl, { params: params });
  // }

  // getById(Id: number) {
  //   return this.httpClient.get(this.resourceUrl + Id);
  // }

  post(obj: Cliente) {
    return this.httpClient.post(this.clientesUrl, obj);
  }

  // put(Id: number, obj:Articulo) {
  //   return this.httpClient.put(this.resourceUrl + Id, obj);
  // }

  // delete(Id) {
  //   return this.httpClient.delete(this.resourceUrl + Id);
  // }
}
