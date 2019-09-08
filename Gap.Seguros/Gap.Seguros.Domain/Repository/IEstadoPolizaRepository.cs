using Gap.Seguros.Domain.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.Domain.Repository
{
    public interface IEstadoPolizaRepository
    {

        /// <summary>
        /// Consultar los estados poliza.
        /// </summary>
        /// <returns></returns>
        Task<List<EstadoPoliza>> ConsultarEstadosPoliza();
    }
}
