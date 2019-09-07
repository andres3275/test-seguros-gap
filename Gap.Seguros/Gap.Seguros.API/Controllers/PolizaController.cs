using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Threading.Tasks;
using Gap.Seguros.API.Services;
using Gap.Seguros.Domain.Dto;
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

        // GET: api/Poliza/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Poliza
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Poliza/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
