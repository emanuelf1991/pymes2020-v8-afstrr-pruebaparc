import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Observable, of } from "rxjs";

import { ICliente} from "../models/icliente";


@Injectable({
  providedIn: "root"
})
export class ClientesService {
  private resourceUrl ="https://demo3151356.mockable.io/clientes/";
  constructor(private http: HttpClient) {}

  getClientes(): Observable<ICliente[]>{
    return this.http.get<ICliente[]>(this.resourceUrl);
  }

  get() {
    let params = new HttpParams();

    return this.http.get(this.resourceUrl, { params: params });
  }


  //getById(Id: number) {
  // return this.httpClient.get(this.resourceUrl + Id);
  //}

  post(obj: ICliente) {
    return this.http.post(this.resourceUrl, obj);
  }

  //put(Id: number, obj:Articulo) {
  //return this.httpClient.put(this.resourceUrl + Id, obj);
  //}

  //delete(Id) {
  // return this.httpClient.delete(this.resourceUrl + Id);
  //}
}