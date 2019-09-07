using System.Collections.Generic;

namespace Gap.Seguros.Domain.Model
{
    public partial class Usuario
    {
        public Usuario()
        {
            Poliza = new HashSet<Poliza>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cedula { get; set; }
        public string NombreUsuario { get; set; }
        public string Contrasenia { get; set; }
        public int TipoUsuarioId { get; set; }

        public virtual TipoUsuario TipoUsuario { get; set; }
        public virtual ICollection<Poliza> Poliza { get; set; }
    }
}
