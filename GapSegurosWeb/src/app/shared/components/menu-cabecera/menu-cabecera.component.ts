import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-cabecera',
  templateUrl: './menu-cabecera.component.html',
  styleUrls: ['./menu-cabecera.component.css']
})
export class MenuCabeceraComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onLogout(): void {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Cerrar la sesión?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'No.'
    }).then(respuesta => {
      if (respuesta.value) {
        this.cerrarSesion();
      }
    });
  }

  private cerrarSesion(): void {

  }

}
