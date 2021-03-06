﻿using Newtonsoft.Json;
using System.Collections.Generic;

namespace Gap.Seguros.Domain.Model
{
    public partial class TipoRiesgo
    {
        public TipoRiesgo()
        {
            Poliza = new HashSet<Poliza>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        [JsonIgnore]
        public virtual ICollection<Poliza> Poliza { get; set; }
    }
}
