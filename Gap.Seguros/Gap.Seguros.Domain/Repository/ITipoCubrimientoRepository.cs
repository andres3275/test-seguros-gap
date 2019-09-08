using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.Domain.Repository
{
    /// <summary>
    /// Contrato de repositorio de tipo cubrimiento
    /// </summary>
    public interface ITipoCubrimientoRepository
    {

        /// <summary>
        /// Consulta los tipos cubrimientos.
        /// </summary>
        /// <returns></returns>
        Task<List<TipoCubrimiento>> ConsultarTiposCubrimientos();
    }
}
