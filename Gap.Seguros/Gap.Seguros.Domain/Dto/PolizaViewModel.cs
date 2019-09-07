using System;
using System.Collections.Generic;
using System.Text;

namespace Gap.Seguros.Domain.Dto
{
    public class PolizaViewModel
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string TipoCubrimiento { get; set; }
        public decimal? Cobertura { get; set; }
        public string TipoRiesgo { get; set; }
        public DateTime? FechaInicioVigencia { get; set; }
        public int? DuracionMesesCobertura { get; set; }
        public decimal? Precio { get; set; }
        public string EstadoPoliza { get; set; }
        public string Cliente { get; set; }
    }
}
