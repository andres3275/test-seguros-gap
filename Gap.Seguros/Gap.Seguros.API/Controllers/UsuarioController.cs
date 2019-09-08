using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Gap.Seguros.API.Services;
using Gap.Seguros.Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gap.Seguros.API.Controllers
{
    /// <summary>
    /// Endpoints de usuario
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private readonly IGestionUsuarioService _gestionUsuarioService;

        /// <summary>
        /// Initializes a new instance of the <see cref="UsuarioController"/> class.
        /// </summary>
        /// <param name="gestionUsuarioService">The gestion usuario service.</param>
        public UsuarioController(IGestionUsuarioService gestionUsuarioService) {
            this._gestionUsuarioService = gestionUsuarioService;
        }


        /// <summary>
        /// Obtiene la lista de usuarios donde el tipo de usuario es cliente.
        /// </summary>
        [HttpGet("consultarClientes")]
        [ProducesResponseType(typeof(Collection<Usuario>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ConsultarClientes()
        {
            try
            {
                var listaClientes = await this._gestionUsuarioService.ConsultarClientes().ConfigureAwait(false);
                if (listaClientes != null && listaClientes.Count > 0)
                {
                    return Ok(listaClientes);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception.Message);
            }
        }
    }
}
