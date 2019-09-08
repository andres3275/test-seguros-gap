using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.API.Services
{

    /// <summary>
    /// Gestion de Estados de poliza
    /// </summary>
    public interface IGestionEstadoPolizaService
    {


        /// <summary>
        /// Consultar los estados poliza.
        /// </summary>
        /// <returns></returns>
        Task<List<EstadoPoliza>> ConsultarEstadosPoliza();
    }
}
