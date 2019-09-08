using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.Domain.Repository
{
    public interface ITipoRiesgoRepository
    {
        /// <summary>
        /// Consulta los tipos riesgos.
        /// </summary>
        /// <returns></returns>
        Task<List<TipoRiesgo>> ConsultarTiposRiesgos();
    }
}
