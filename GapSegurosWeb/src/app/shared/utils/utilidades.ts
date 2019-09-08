import Swal from "sweetalert2";

export function mostrarLoading(): void {
  Swal.fire({
    title: "Espere por favor...",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    }
  });
}

export function ocultarLoading(): void {
  Swal.close();
}
