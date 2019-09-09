using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.API.Services
{
    /// <summary>
    /// Servicio de aplicacion para la gestion de operaciones de Usuario
    /// </summary>
    public interface IGestionUsuarioService
    {
        /// <summary>
        ///  Obtiene la lista de usuarios donde el tipo usuario es cliente.
        /// </summary>
        Task<List<Usuario>> ConsultarClientes();

        /// <summary>
        /// Autentica el usuario especificado y genera un token jwt.
        /// </summary>
        /// <param name="usuario">The usuario.</param>
        /// <returns></returns>
        Task<string> Autenticar(Usuario usuario);
    }
}
