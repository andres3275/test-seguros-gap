using System;
using System.Collections.ObjectModel;
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
    public class TipoRiesgoController : ControllerBase
    {

        private readonly IGestionTipoRiesgoService _gestionTipoRiesgoService;


        /// <summary>
        /// Initializes a new instance of the <see cref="TipoRiesgoController"/> class.
        /// </summary>
        /// <param name="gestionTipoRiesgoService">The gestion tipo riesgo service.</param>
        public TipoRiesgoController(IGestionTipoRiesgoService gestionTipoRiesgoService) {
            this._gestionTipoRiesgoService = gestionTipoRiesgoService;
        }



        /// <summary>
        /// Obtiene todos los tipos riesgos.
        /// </summary>
        [HttpGet("consultarTiposRiesgos")]
        [ProducesResponseType(typeof(Collection<TipoRiesgo>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ConsultarTiposRiesgos()
        {
            try
            {
                var listaTiposRiesgos = await this._gestionTipoRiesgoService.ConsultarTiposRiesgos().ConfigureAwait(false);
                if (listaTiposRiesgos != null && listaTiposRiesgos.Count > 0)
                {
                    return Ok(listaTiposRiesgos);
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
