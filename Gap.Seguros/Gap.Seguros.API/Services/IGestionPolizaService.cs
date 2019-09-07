

using Gap.Seguros.Domain.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.API.Services
{
    /// <summary>
    /// Gestion de operaciones CRUD para la poliza
    /// </summary>
    public interface IGestionPolizaService
    {
        /// <summary>
        /// Operacion CRUD de consulta para Poliza
        /// </summary>
        /// <returns></returns>
        Task<List<PolizaViewModel>> ConsultarPolizas();
    }
}
