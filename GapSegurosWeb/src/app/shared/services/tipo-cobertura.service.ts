import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TipoCubrimiento } from '../interfaces/tipo-cubrimiento.model';

@Injectable({
  providedIn: "root"
})

export class TipoCubrimientoService {
  constructor(private _httpClient: HttpClient) {}

  public consultarTiposCobertura(): Observable<TipoCubrimiento[]> {
    return this._httpClient.get<TipoCubrimiento[]>(
      environment.apiUrl + "/TipoCubrimiento/consultarTiposCubrimientos"
    );
  }

}
