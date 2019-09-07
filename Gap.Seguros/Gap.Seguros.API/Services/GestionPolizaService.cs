

using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Dto;
using Gap.Seguros.Domain.Repository;

namespace Gap.Seguros.API.Services
{
    /// <summary></summary>
    /// <seealso cref="Gap.Seguros.API.Services.IGestionPolizaService" />
    public class GestionPolizaService : IGestionPolizaService
    {
        private readonly IPolizaRepository _polizaRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="GestionPolizaService"/> class.
        /// </summary>
        /// <param name="polizaRepository">The poliza repository.</param>
        public GestionPolizaService(IPolizaRepository polizaRepository) {
            this._polizaRepository = polizaRepository;
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
    }
}
