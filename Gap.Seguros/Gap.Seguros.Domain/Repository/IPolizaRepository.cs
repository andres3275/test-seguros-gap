using Gap.Seguros.Domain.Dto;
using Gap.Seguros.Domain.Model;
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

        /// <summary>
        /// Crea una nueva poliza.
        /// </summary>
        /// <param name="nuevaPoliza">la nueva poliza.</param>
        /// <returns></returns>
        Task<int> CrearPoliza(Poliza nuevaPoliza);

        /// <summary>
        /// Actualiza la poliza.
        /// </summary>
        /// <param name="nuevaPoliza">la poliza.</param>
        Task<int> EditarPoliza(Poliza poliza);

        /// <summary>
        /// Elimina la poliza con identificador id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        Task<int> EliminarPoliza(int id);
    }
}
