using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Gap.Seguros.Infrastructure.Repository
{
    public class TipoCubrimientoRepository : ITipoCubrimientoRepository
    {

        private readonly GapSegurosContext _dbContext;
        public TipoCubrimientoRepository(GapSegurosContext dbContext)
        {
            this._dbContext = dbContext;
        }


        public Task<List<TipoCubrimiento>> ConsultarTiposCubrimientos()
        {
            var listaTiposCubrimientos = (from tipoCubrimiento in _dbContext.TipoCubrimiento
                                          select tipoCubrimiento).ToListAsync();
            return listaTiposCubrimientos;
        }
    }
}
