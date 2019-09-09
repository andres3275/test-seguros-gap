import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoLocalService {

  constructor() { }

  public almacenarInformacion(nombreLlave: string, informacion: any): void {
    localStorage.setItem(nombreLlave, JSON.stringify(informacion));
  }

  public obtenerInformacion(nombreLlave: string): any {
    return JSON.parse(localStorage.getItem(nombreLlave));
  }

  public existeInformacion(nombreLlave: string): boolean {
    const informacion = localStorage.getItem(nombreLlave);
    return informacion && informacion !== '';
  }

  public eliminarInformacion(nombreLlave: string):void{
    localStorage.removeItem(nombreLlave);
  }

}
