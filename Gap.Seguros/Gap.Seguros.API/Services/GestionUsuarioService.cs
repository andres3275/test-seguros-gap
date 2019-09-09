using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.API.utils;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;
using Gap.Seguros.Domain.utils;
using Microsoft.Extensions.Options;

namespace Gap.Seguros.API.Services
{



    /// <summary>
    /// Servicio de aplicacion para la gestion de operaciones de usuario
    /// </summary>
    /// <seealso cref="Gap.Seguros.API.Services.IGestionUsuarioService" />
    public class GestionUsuarioService : IGestionUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IOptions<Configuracion> _configuracion;

        /// <summary>
        /// Initializes a new instance of the <see cref="GestionUsuarioService"/> class.
        /// </summary>
        /// <param name="usuarioRepository">The usuario repository.</param>
        ///  /// <param name="configuracion">The configuration.</param>
        public GestionUsuarioService(IUsuarioRepository usuarioRepository, IOptions<Configuracion> configuracion)
        {
            this._usuarioRepository = usuarioRepository;
            this._configuracion = configuracion;
        }

        /// <summary>
        /// Autentica el usuario especificado y genera un token jwt.
        /// </summary>
        /// <param name="usuario">The usuario.</param>
        /// <returns></returns>
        public Task<string> Autenticar(Usuario usuario)
        {
            string tokenJwt = null;
            usuario.Contrasenia = Utilidades.GenerarMd5Hash(usuario.Contrasenia);
            Usuario usuarioAutenticado = this._usuarioRepository.ConsultarXNombreUsuarioContrasenia(usuario).Result;
            if (usuarioAutenticado != null)
            {
                tokenJwt = Utilidades.GenerarTokenJwt(usuario, this._configuracion.Value.LlaveCifrado);
            }
            return Task.FromResult(tokenJwt);
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
