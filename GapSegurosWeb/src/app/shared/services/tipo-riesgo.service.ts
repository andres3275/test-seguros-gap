import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TipoRiesgo } from '../interfaces/tipo-riesgo.model';

@Injectable({
  providedIn: "root"
})

export class TipoRiesgoService {
  constructor(private _httpClient: HttpClient) {}

  public consultarTiposRiesgo(): Observable<TipoRiesgo[]> {
    return this._httpClient.get<TipoRiesgo[]>(
      environment.apiUrl + "/TipoRiesgo/consultarTiposRiesgos"
    );
  }

}
