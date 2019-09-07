using System;
using System.Collections.Generic;
using System.Text;

namespace Gap.Seguros.Domain.Dto
{
    public class PolizaViewModel
    {
        public int? Id {get;set;}
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int TipoCubrimientoId { get; set; }
        public string TipoCubrimiento { get; set; }
        public decimal? Cobertura { get; set; }
        public int TipoRiesgoId { get; set; }
        public string TipoRiesgo { get; set; }
        public DateTime? FechaInicioVigencia { get; set; }
        public int? DuracionMesesCobertura { get; set; }
        public decimal? Precio { get; set; }
        public int EstadoPolizaId { get; set; }
        public string EstadoPoliza { get; set; }
        public int UsuarioId { get; set; }
        public string Cliente { get; set; }
    }
}
