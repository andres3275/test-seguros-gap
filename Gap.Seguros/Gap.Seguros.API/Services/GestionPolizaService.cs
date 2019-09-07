

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Dto;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;
using Gap.Seguros.Domain.Services;

namespace Gap.Seguros.API.Services
{
    /// <summary></summary>
    /// <seealso cref="Gap.Seguros.API.Services.IGestionPolizaService" />
    public class GestionPolizaService : IGestionPolizaService
    {
        private readonly IPolizaRepository _polizaRepository;
        private readonly IPolizaService _polizaService;

        /// <summary>
        /// Initializes a new instance of the <see cref="GestionPolizaService"/> class.
        /// </summary>
        /// <param name="polizaRepository">The poliza repository.</param>
        /// <param name="polizaService">The poliza Service.</param>
        public GestionPolizaService(IPolizaRepository polizaRepository, IPolizaService polizaService) {
            this._polizaRepository = polizaRepository;
            this._polizaService = polizaService;
        }

        /// <summary>
        /// Operacion CRUD de consulta para Poliza
        /// </summary>
        /// <returns></returns>
        /// <exception cref="System.NotImplementedException"></exception>
        public Task<List<PolizaViewModel>> ConsultarPolizas()
        {
            return this._polizaRepository.ConsultarPolizas();
        }

        /// <summary>
        /// Crea una nueva poliza.
        /// </summary>
        /// <param name="nuevaPoliza">la nueva poliza.</param>
        /// <returns></returns>
        public Task<int> CrearPoliza(Poliza nuevaPoliza)
        {
            if (this._polizaService.EsValidaCoberturaPoliza(nuevaPoliza))
            {
                return this._polizaRepository.CrearPoliza(nuevaPoliza);
            }
            return Task.FromResult(0);
        }

        /// <summary>
        /// Actualiza la poliza.
        /// </summary>
        /// <param name="poliza">la poliza.</param>
        public Task<int> EditarPoliza(Poliza poliza)
        {
            if (this._polizaService.EsValidaCoberturaPoliza(poliza))
            {
                return this._polizaRepository.EditarPoliza(poliza);
            }
            return Task.FromResult(0);
        }

        /// <summary>
        /// Elimina la poliza con identificador id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        public Task<int> EliminarPoliza(int id)
        {
            return this._polizaRepository.EliminarPoliza(id);
        }
    }
}
