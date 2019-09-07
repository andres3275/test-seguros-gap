

using Gap.Seguros.Domain.Dto;
using Gap.Seguros.Domain.Model;
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
        Task<List<PolizaViewModel>> ConsultarPolizas();

        /// <summary>
        /// Crea una nueva poliza.
        /// </summary>
        /// <param name="nuevaPoliza">la nueva poliza.</param>
        Task<int> CrearPoliza(Poliza nuevaPoliza);

        /// <summary>
        /// Actualiza la poliza.
        /// </summary>
        /// <param name="poliza">la poliza.</param>
        Task<int> EditarPoliza(Poliza poliza);


        /// <summary>
        /// Elimina la poliza con identificador id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        Task<int> EliminarPoliza(int id);
    }
}
