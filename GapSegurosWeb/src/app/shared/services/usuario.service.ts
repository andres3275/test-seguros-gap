import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from '../interfaces/usuario.model';

@Injectable({
  providedIn: "root"
})

export class UsuarioService {
  constructor(private _httpClient: HttpClient) {}

  public consultarClientes(): Observable<Usuario[]> {
    return this._httpClient.get<Usuario[]>(
      environment.apiUrl + "/Usuario/consultarClientes"
    );
  }

}
