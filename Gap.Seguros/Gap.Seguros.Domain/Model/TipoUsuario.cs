using System.Collections.Generic;

namespace Gap.Seguros.Domain.Model
{
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
