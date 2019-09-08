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
    /// Endpoints de Estado poliza
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoPolizaController : ControllerBase
    {

        private readonly IGestionEstadoPolizaService _gestionEstadoPolizaService;



        /// <summary>
        /// Initializes a new instance of the <see cref="EstadoPolizaController"/> class.
        /// </summary>
        /// <param name="gestionEstadoPolizaService">The gestion estado poliza service.</param>
        public EstadoPolizaController(IGestionEstadoPolizaService gestionEstadoPolizaService) {
            this._gestionEstadoPolizaService = gestionEstadoPolizaService;
        }



        /// <summary>
        /// Consulta los estados poliza.
        /// </summary>
        /// <returns></returns>
        [HttpGet("consultarEstadosPoliza")]
        [ProducesResponseType(typeof(Collection<EstadoPoliza>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ConsultarEstadosPoliza()
        {
            try
            {
                var listaEstadosPoliza = await this._gestionEstadoPolizaService.ConsultarEstadosPoliza().ConfigureAwait(false);
                if (listaEstadosPoliza != null && listaEstadosPoliza.Count > 0)
                {
                    return Ok(listaEstadosPoliza);
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
