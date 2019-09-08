import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EstadoPoliza } from 'src/app/shared/interfaces/estado-poliza.model';

@Injectable({
  providedIn: "root"
})

export class EstadoPolizaService {
  constructor(private _httpClient: HttpClient) {}

  public consultarEstadosPoliza(): Observable<EstadoPoliza[]> {
    return this._httpClient.get<EstadoPoliza[]>(
      environment.apiUrl + "/EstadoPoliza/consultarEstadosPoliza"
    );
  }

}
