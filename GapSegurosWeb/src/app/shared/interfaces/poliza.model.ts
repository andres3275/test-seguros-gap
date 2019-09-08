export interface Poliza {
  id: number;
  nombre: string;
  descripcion: string;
  tipoCubrimientoId: number;
  tipoRiesgoId: number;
  cobertura: number;
  fechaInicioVigencia: string;
  duracionMesesCobertura: number;
  precio: number;
  estadoPolizaId: number;
  usuarioId: number;
}
