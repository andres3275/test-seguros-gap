using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.Domain.Repository
{
    public interface IUsuarioRepository
    {
        /// <summary>
        ///  Obtiene la lista de usuarios donde el tipo usuario es cliente.
        /// </summary>
        Task<List<Usuario>> ConsultarClientes();
    }
}
