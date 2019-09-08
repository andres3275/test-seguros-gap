using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Gap.Seguros.Infrastructure.Repository
{
    public class EstadoPolizaRepository : IEstadoPolizaRepository
    {

        private readonly GapSegurosContext _dbContext;
        public EstadoPolizaRepository(GapSegurosContext dbContext)
        {
            this._dbContext = dbContext;
        }


        public Task<List<EstadoPoliza>> ConsultarEstadosPoliza()
        {
            var listaEstadosPoliza = (from EstadoPoliza in _dbContext.EstadoPoliza
                                     select EstadoPoliza).ToListAsync();
            return listaEstadosPoliza;
        }
    }
}
