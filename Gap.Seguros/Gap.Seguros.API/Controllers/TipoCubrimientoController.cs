using System;
using System.Collections.ObjectModel;
using System.Net;
using System.Threading.Tasks;
using Gap.Seguros.API.Services;
using Gap.Seguros.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gap.Seguros.API.Controllers
{
    /// <summary>
    /// Endpoints de Tipos Cubrimiento
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TipoCubrimientoController : ControllerBase
    {

        private readonly IGestionTipoCubrimientoService _gestionTipoCubrimientoService;



        /// <summary>
        /// Initializes a new instance of the <see cref="TipoCubrimientoController"/> class.
        /// </summary>
        /// <param name="gestionTipoCubrimientoService">The gestion tipo cubrimiento service.</param>
        public TipoCubrimientoController(IGestionTipoCubrimientoService gestionTipoCubrimientoService) {
            this._gestionTipoCubrimientoService = gestionTipoCubrimientoService;
        }



        /// <summary>
        /// Obtiene todos los tipos Cubrimiento.
        /// </summary>
        [HttpGet("consultarTiposCubrimientos")]
        [ProducesResponseType(typeof(Collection<TipoCubrimiento>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ConsultarTiposCubrimientos()
        {
            try
            {
                var listaTiposCubrimientos = await this._gestionTipoCubrimientoService.ConsultarTiposCubrimientos().ConfigureAwait(false);
                if (listaTiposCubrimientos != null && listaTiposCubrimientos.Count > 0)
                {
                    return Ok(listaTiposCubrimientos);
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
