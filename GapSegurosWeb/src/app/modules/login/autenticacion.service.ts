import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/interfaces/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private _httpClient: HttpClient) { }

  public autenticar(usuario: Usuario): Observable<any> {
    return this._httpClient.post<any>(environment.apiUrl + "/Usuario/autenticar", usuario);
  }
}
