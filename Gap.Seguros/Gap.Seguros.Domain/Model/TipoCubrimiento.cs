using System.Collections.Generic;

namespace Gap.Seguros.Domain.Model
{
    public partial class TipoCubrimiento
    {
        public TipoCubrimiento()
        {
            Poliza = new HashSet<Poliza>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Poliza> Poliza { get; set; }
    }
}
