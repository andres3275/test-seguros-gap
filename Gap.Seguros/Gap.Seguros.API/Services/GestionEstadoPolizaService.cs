using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;

namespace Gap.Seguros.API.Services
{



    /// <summary>
    /// Gestion de estados de poliza
    /// </summary>
    /// <seealso cref="Gap.Seguros.API.Services.IGestionEstadoPolizaService" />
    public class GestionEstadoPolizaService : IGestionEstadoPolizaService
    {
        private readonly IEstadoPolizaRepository _estadoPolizaRepository;



        /// <summary>
        /// Initializes a new instance of the <see cref="GestionEstadoPolizaService"/> class.
        /// </summary>
        /// <param name="estadoPolizaRepository">The estado poliza repository.</param>
        public GestionEstadoPolizaService(IEstadoPolizaRepository estadoPolizaRepository) {
            this._estadoPolizaRepository = estadoPolizaRepository;
        }

        /// <summary>
        /// Consultar los estados poliza.
        /// </summary>
        /// <returns></returns>
        public Task<List<EstadoPoliza>> ConsultarEstadosPoliza()
        {
            return this._estadoPolizaRepository.ConsultarEstadosPoliza();
        }
    }
}
