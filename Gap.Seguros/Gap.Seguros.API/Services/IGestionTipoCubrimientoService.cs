using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.API.Services
{

    /// <summary>
    /// Contrato para la gestion de tipos de cubrimientos
    /// </summary>
    public interface IGestionTipoCubrimientoService
    {


        /// <summary>
        /// Consultars the tipos cubrimientos.
        /// </summary>
        /// <returns></returns>
        Task<List<TipoCubrimiento>> ConsultarTiposCubrimientos();
    }
}
