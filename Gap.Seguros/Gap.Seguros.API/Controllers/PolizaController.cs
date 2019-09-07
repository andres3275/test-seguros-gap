using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Threading.Tasks;
using Gap.Seguros.API.Services;
using Gap.Seguros.Domain.Dto;
using Gap.Seguros.Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gap.Seguros.API.Controllers
{
    /// <summary>
    /// Endpoints REST para Poliza
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/[controller]")]
    [ApiController]
    public class PolizaController : ControllerBase
    {

        private readonly IGestionPolizaService _gestionPolizaService;

        /// <summary>
        /// Initializes a new instance of the <see cref="PolizaController"/> class.
        /// </summary>
        /// <param name="gestionPolizaService">The gestion poliza service.</param>
        public PolizaController(IGestionPolizaService gestionPolizaService)
        {
            this._gestionPolizaService = gestionPolizaService;
        }


        /// <summary>
        /// Obtiene todas las polizas.
        /// </summary>
        /// <returns></returns>
        [HttpGet("consultarPolizas")]
        [ProducesResponseType(typeof(Collection<PolizaViewModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(Exception), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ConsultarPolizas()
        {
            try
            {
                var listaPolizas = await this._gestionPolizaService.ConsultarPolizas().ConfigureAwait(false);
                if (listaPolizas != null && listaPolizas.Count > 0)
                {
                    return Ok(listaPolizas);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception);
            }
        }




        /// <summary>
        /// Crea una nueva poliza.
        /// </summary>
        /// <param name="nuevaPoliza">la nueva poliza.</param>
        [HttpPost("crearPoliza")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(Exception), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CrearPoliza(Poliza nuevaPoliza)
        {
            try
            {
                var resultadoCrearPoliza = await this._gestionPolizaService.CrearPoliza(nuevaPoliza).ConfigureAwait(false);
                if (resultadoCrearPoliza > 0)
                {
                    return Ok(nuevaPoliza.Id);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception);
            }
        }


        /// <summary>
        /// Actualiza la poliza con los nuevos cambios.
        /// </summary>
        /// <param name="poliza">La poliza.</param>
        [HttpPut("editarPoliza")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(Exception), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> EditarPoliza(Poliza poliza)
        {
            try
            {
                var resultadoEditarPoliza = await this._gestionPolizaService.EditarPoliza(poliza).ConfigureAwait(false);
                if (resultadoEditarPoliza > 0)
                {
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception);
            }
        }


        /// <summary>
        /// Elimina la poliza.
        /// </summary>
        /// <param name="id">The identifier.</param>
        [HttpDelete("eliminarPoliza/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(Exception), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> EliminarPoliza(int id)
        {
            try
            {
                var resultadoEliminarPoliza = await this._gestionPolizaService.EliminarPoliza(id).ConfigureAwait(false);
                if (resultadoEliminarPoliza > 0)
                {
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception);
            }
        }
    }
}
