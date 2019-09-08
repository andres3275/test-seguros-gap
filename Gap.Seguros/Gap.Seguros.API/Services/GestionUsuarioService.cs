using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;

namespace Gap.Seguros.API.Services
{



    /// <summary>
    /// Servicio de aplicacion para la gestion de operaciones de usuario
    /// </summary>
    /// <seealso cref="Gap.Seguros.API.Services.IGestionUsuarioService" />
    public class GestionUsuarioService : IGestionUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="GestionUsuarioService"/> class.
        /// </summary>
        /// <param name="usuarioRepository">The usuario repository.</param>
        public GestionUsuarioService(IUsuarioRepository usuarioRepository) {
            this._usuarioRepository = usuarioRepository;
        }

        /// <summary>
        /// Obtiene la lista de usuarios donde el tipo usuario es cliente.
        /// </summary>
        public Task<List<Usuario>> ConsultarClientes()
        {
            return this._usuarioRepository.ConsultarClientes();
        }
    }
}
