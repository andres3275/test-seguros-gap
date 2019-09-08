export interface PolizaViewModel {
  id: number;
  nombre: string;
  descripcion: string;
  tipoCubrimientoId: number;
  tipoCubrimiento: string;
  cobertura: number;
  tipoRiesgoId: number;
  tipoRiesgo: string;
  fechaInicioVigencia: string;
  duracionMesesCobertura: number;
  precio: number;
  estadoPolizaId: number;
  estadoPoliza: string;
  usuarioId: number;
  cliente: string;
}
