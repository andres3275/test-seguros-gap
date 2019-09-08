using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Gap.Seguros.Infrastructure.Repository
{
    public class TipoRiesgoRepository : ITipoRiesgoRepository
    {

        private readonly GapSegurosContext _dbContext;
        public TipoRiesgoRepository(GapSegurosContext dbContext)
        {
            this._dbContext = dbContext;
        }


        public Task<List<TipoRiesgo>> ConsultarTiposRiesgos()
        {
            var listaTiposRiesgos = (from tipoRiesgo in _dbContext.TipoRiesgo
                                     select tipoRiesgo).ToListAsync();
            return listaTiposRiesgos;
        }
    }
}
