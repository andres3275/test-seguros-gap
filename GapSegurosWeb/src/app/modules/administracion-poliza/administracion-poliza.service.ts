import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PolizaViewModel } from 'src/app/shared/interfaces/poliza-view-model.model';
import { Poliza } from 'src/app/shared/interfaces/poliza.model';

@Injectable({
  providedIn: "root"
})
export class AdministracionPolizaService {
  constructor(private _httpClient: HttpClient) {}

  public consultarPolizas(): Observable<PolizaViewModel[]> {
    return this._httpClient.get<PolizaViewModel[]>(
      environment.apiUrl + "/Poliza/consultarPolizas"
    );
  }

  public crearPoliza(poliza: Poliza): Observable<number> {
    return this._httpClient.post<number>(
      environment.apiUrl + "/Poliza/crearPoliza",
      poliza
    );
  }

  public editarPoliza(poliza: Poliza): Observable<void> {
    return this._httpClient.put<void>(
      environment.apiUrl + "/Poliza/editarPoliza",
      poliza
    );
  }

  public eliminarPoliza(id: number): Observable<void> {
    return this._httpClient.delete<void>(
      environment.apiUrl + "/Poliza/eliminarPoliza/" + id
    );
  }
}
