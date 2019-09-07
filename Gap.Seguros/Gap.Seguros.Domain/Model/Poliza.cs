using Newtonsoft.Json;
using System;

namespace Gap.Seguros.Domain.Model
{
    public partial class Poliza
    {
        public int? Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int TipoCubrimientoId { get; set; }
        public int TipoRiesgoId { get; set; }
        public decimal? Cobertura { get; set; }
        public DateTime? FechaInicioVigencia { get; set; }
        public int? DuracionMesesCobertura { get; set; }
        public decimal? Precio { get; set; }
        public int EstadoPolizaId { get; set; }
        public int UsuarioId { get; set; }

        [JsonIgnore]
        public virtual EstadoPoliza EstadoPoliza { get; set; }
        [JsonIgnore]
        public virtual TipoCubrimiento TipoCubrimiento { get; set; }
        [JsonIgnore]
        public virtual TipoRiesgo TipoRiesgo { get; set; }
        [JsonIgnore]
        public virtual Usuario Usuario { get; set; }
    }
}
