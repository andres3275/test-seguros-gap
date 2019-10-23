import { Component, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/shared/interfaces/usuario.model';
import { AutenticacionService } from './autenticacion.service';
import { AlmacenamientoLocalService } from 'src/app/shared/services/almacenamiento-local.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as HttpStatus from 'http-status-codes';
import Swal from 'sweetalert2';
import { LlavesAlmacenamientoLocal } from 'src/app/shared/constants/llaves-almacenamiento-local.enum';
import { RutasAplicacion } from 'src/app/shared/constants/rutas-aplicacion.enum';
import {
  mostrarLoading,
  ocultarLoading
} from 'src/app/shared/utils/utilidades';
import * as CryptoJS from 'crypto-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  public usuarioForm: FormGroup;
  private _subscripcionFinalizada$ = new Subject();

  constructor(
    private _autenticacionService: AutenticacionService,
    private _almacenamientoLocalService: AlmacenamientoLocalService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.inicializarVariables();
  }

  public ngOnDestroy(): void {
    this.finalizarSubscripciones();
  }

  private finalizarSubscripciones(): void {
    this._subscripcionFinalizada$.next();
    this._subscripcionFinalizada$.complete();
  }

  private aplicarMd5HashContrasenia(): string {
    return CryptoJS.MD5(this.usuarioForm.controls.contrasenia.value).toString();
  }

  private autenticar(): void {
    mostrarLoading();
    const usuario: Usuario = {
      cedula: undefined,
      id: undefined,
      nombre: undefined,
      contrasenia: this.aplicarMd5HashContrasenia(),
      nombreUsuario: this.usuarioForm.controls.nombreUsuario.value
    };
    this._autenticacionService
      .autenticar(usuario)
      .pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe(
        (respuesta: any) => {
          ocultarLoading();
          this._almacenamientoLocalService.almacenarInformacion(
            LlavesAlmacenamientoLocal.token,
            respuesta.token
          );
          this._router.navigate([RutasAplicacion.administrarPoliza]);
        },
        (error: any) => {
          this.procesarError(error);
        }
      );
  }

  public onLogin(): void {
    this.autenticar();
  }

  private procesarError(error: any): void {
    let mensaje: string;
    if (error.status === HttpStatus.UNAUTHORIZED) {
      mensaje = 'Usuario o contraseña Invalidos.';
    }
    Swal.fire('Advertencia', mensaje, 'warning');
  }

  private inicializarVariables(): void {
    this.usuarioForm = this._formBuilder.group({
      nombreUsuario: ['', [Validators.required, Validators.maxLength(49)]],
      contrasenia: ['', [Validators.required, Validators.maxLength(49)]]
    });
  }
}
