using Gap.Seguros.Domain.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gap.Seguros.Domain.Repository
{
    /// <summary>
    /// Contrato de Operaciones CRUD para Poliza
    /// </summary>
    public interface IPolizaRepository
    {
        /// <summary>
        /// Consulta todas las polizas registradas.
        /// </summary>
        /// <returns></returns>
        Task<List<PolizaViewModel>> ConsultarPolizas();
    }
}
