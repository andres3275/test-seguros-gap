using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;

namespace Gap.Seguros.API.Services
{


    /// <seealso cref="Gap.Seguros.API.Services.IGestionTipoCubrimientoService" />
    public class GestionTipoCubrimientoService : IGestionTipoCubrimientoService
    {
        private readonly ITipoCubrimientoRepository _tipoCubrimientoRepository;



        /// <summary>
        /// Initializes a new instance of the <see cref="GestionTipoCubrimientoService"/> class.
        /// </summary>
        /// <param name="tipoCubrimientoRepository">The tipo cubrimiento repository.</param>
        public GestionTipoCubrimientoService(ITipoCubrimientoRepository tipoCubrimientoRepository) {
            this._tipoCubrimientoRepository = tipoCubrimientoRepository;
        }

        /// <summary>
        /// Consultas los tipos cubrimientos.
        /// </summary>
        public Task<List<TipoCubrimiento>> ConsultarTiposCubrimientos()
        {
            return this._tipoCubrimientoRepository.ConsultarTiposCubrimientos();
        }
    }
}
