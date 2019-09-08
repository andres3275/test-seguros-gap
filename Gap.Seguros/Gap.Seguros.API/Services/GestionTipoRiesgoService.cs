using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;

namespace Gap.Seguros.API.Services
{


    /// <summary>
    /// Servicio de aplicacion para la gestion de tipos de riesgos
    /// </summary>
    /// <seealso cref="Gap.Seguros.API.Services.IGestionTipoRiesgoService" />
    public class GestionTipoRiesgoService : IGestionTipoRiesgoService
    {
        private readonly ITipoRiesgoRepository _tipoRiesgoRepository;


        /// <summary>
        /// Initializes a new instance of the <see cref="GestionTipoRiesgoService"/> class.
        /// </summary>
        /// <param name="tipoRiesgoRepository">The tipo riesgo repository.</param>
        public GestionTipoRiesgoService(ITipoRiesgoRepository tipoRiesgoRepository) {
            this._tipoRiesgoRepository = tipoRiesgoRepository;
        }

        /// <summary>
        /// Consulta los tipos riesgos.
        /// </summary>
        /// <returns></returns>
        public Task<List<TipoRiesgo>> ConsultarTiposRiesgos()
        {
            return this._tipoRiesgoRepository.ConsultarTiposRiesgos();
        }
    }
}
