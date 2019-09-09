import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlmacenamientoLocalService } from '../services/almacenamiento-local.service';
import { LlavesAlmacenamientoLocal } from '../constants/llaves-almacenamiento-local.enum';
import { RutasAplicacion } from '../constants/rutas-aplicacion.enum';

@Injectable({ providedIn: 'root' })
export class AutorizadorRuta implements CanActivate {

    constructor(private _router: Router,
        private _almacenamientoLocalService: AlmacenamientoLocalService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        switch ((state.url).replace('/', '')) {
            case RutasAplicacion.administrarPoliza: {
                if (this._almacenamientoLocalService.existeInformacion(LlavesAlmacenamientoLocal.token)) {
                    return true;
                }
                this._router.navigate([RutasAplicacion.login]);
                return false;
            }
            case RutasAplicacion.login: {
                if (!this._almacenamientoLocalService.existeInformacion(LlavesAlmacenamientoLocal.token)) {
                    return true;
                }
                this._router.navigate([RutasAplicacion.administrarPoliza]);
                return false;
            }
            case '': {
                if (!this._almacenamientoLocalService.existeInformacion(LlavesAlmacenamientoLocal.token)) {
                    return true;
                }
                this._router.navigate([RutasAplicacion.administrarPoliza]);
                return false;
            }
            default: {
                return false;
            }
        }
    }

}