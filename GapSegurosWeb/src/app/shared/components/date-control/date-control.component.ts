import { Component, ViewChild, Input } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import Swal from "sweetalert2";

@Component({
  selector: "app-date-control",
  templateUrl: "./date-control.component.html",
  styleUrls: ["./date-control.component.css"]
})
export class DateControlComponent {
  public formato = "YYYY-MM-DD";
  public restringir = false;
  public model: NgbDateStruct;
  @ViewChild("dateControl", { static: false }) public dateControl: any;
  public today = moment(new Date());
  public mesActual = moment().startOf("month");
  public mesAnterior = moment()
    .startOf("month")
    .subtract(1, "month");
  public ultimosTreintaDias = moment().subtract(30, "days");

  @Input()
  public set dcFecha(value: any) {
    let fechaFinal: any;

    if (value === "") {
      value = undefined;
    }

    if (
      moment(value, "DD/M/YY").isValid() &&
      this.validarFormato("DD/M/YY", value, "/")
    ) {
      const fechaEjemplo = moment(value, "DD/M/YY");
      fechaFinal = fechaEjemplo.format("YYYY-MM-DD");
    }

    if (
      moment(value, "DD/MM/YYYY").isValid() &&
      this.validarFormato("DD/MM/YYYY", value, "/")
    ) {
      const fechaEjemplo = moment(value, "DD/MM/YYYY");
      fechaFinal = fechaEjemplo.format("YYYY-MM-DD");
    }

    if (
      moment(value, "YYYY/MM/DD").isValid() &&
      this.validarFormato("YYYY/MM/DD", value, "/")
    ) {
      const fechaEjemplo = moment(value, "YYYY/MM/DD");
      fechaFinal = fechaEjemplo.format("YYYY-MM-DD");
    }

    if (
      moment(value, "YYYY-MM-DD").isValid() &&
      this.validarFormato("YYYY-MM-DD", value, "-")
    ) {
      const fechaEjemplo = moment(value, "YYYY-MM-DD");
      fechaFinal = fechaEjemplo.format("YYYY-MM-DD");
    }

    if (value != null) {
      this.model = {
        year: parseInt(moment(fechaFinal).format("YYYY"), 10),
        month: parseInt(moment(fechaFinal).format("MM"), 10),
        day: parseInt(moment(fechaFinal).format("DD"), 10)
      };
    } else {
      this.model = undefined;
    }
  }

  @Input()
  public set restringirFecha(value: any) {
    if (value != null) {
      this.restringir = value;
    }
  }

  public get inputDate() {
    if (!this.model) {
      return "";
    }

    let mes = this.model.month.toString();

    if (mes.length === 1) {
      mes = "0" + mes;
    }

    const fecha = moment(`${this.model.year}-${mes}-${this.model.day}`);

    if (!fecha.isValid()) {
      return "";
    }

    return moment(fecha).format(this.formato);
  }

  constructor() {}

  public setDateTime(fecha: any): void {
    this.model = {
      year: parseInt(fecha.format("YYYY")),
      month: parseInt(fecha.format("MM")),
      day: parseInt(fecha.format("DD"))
    };
  }

  private validarFormato(
    formato: string,
    fecha: string,
    separador: string
  ): boolean {
    const splitFormato = formato.split(separador);
    const splitfecha = fecha.split(separador);
    let estado = true;

    if (splitFormato.length !== splitfecha.length) {
      estado = false;
    }

    for (let index = 0; index < splitFormato.length; index++) {
      if (splitFormato[index].length !== splitfecha[index].length) {
        estado = false;
        break;
      }
    }

    return estado;
  }

  private obtenerFecha(): string {
    if (!this.model) {
      return "";
    }

    let mes = this.model.month.toString();

    if (mes.length === 1) {
      mes = "0" + mes;
    }

    const fecha = moment(`${this.model.year}-${mes}-${this.model.day}`);

    if (!fecha.isValid()) {
      return "";
    }

    return moment(fecha).format(this.formato);
  }

  public clear(): void {
    this.model = null;
  }

  public OnChangeFecha(): void {
    setTimeout(() => {
      const fechaActual = this.obtenerFecha();

      if (this.restringir) {
        if (moment(fechaActual) > moment(new Date())) {
          Swal.fire(
            "Advertencia",
            "La fecha no puede ser mayor al día actual",
            "warning"
          );

          this.model = null;
        }
      }
    }, 50);
  }
}
