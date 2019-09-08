using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.API.Services
{
    /// <summary>
    /// Servicio Aplicacion para la gestion de tipos de riesgos de una poliza
    /// </summary>
    public interface IGestionTipoRiesgoService
    {

        /// <summary>
        /// Consulta los tipos riesgos.
        /// </summary>
        /// <returns></returns>
        Task<List<TipoRiesgo>> ConsultarTiposRiesgos();
    }
}
