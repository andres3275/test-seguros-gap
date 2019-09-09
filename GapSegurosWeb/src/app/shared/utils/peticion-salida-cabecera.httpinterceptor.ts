import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlmacenamientoLocalService } from '../services/almacenamiento-local.service';
import { LlavesAlmacenamientoLocal } from '../constants/llaves-almacenamiento-local.enum';

@Injectable()
export class PeticionSalidaCabeceraInterceptor implements HttpInterceptor {

    constructor(private _almacenamientoLocalService: AlmacenamientoLocalService) {

    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._almacenamientoLocalService.obtenerInformacion(LlavesAlmacenamientoLocal.token);
        if (token) {
            const request = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(request);
        }
        return next.handle(req.clone());
    }
}
