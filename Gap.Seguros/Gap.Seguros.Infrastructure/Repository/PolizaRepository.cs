using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Dto;
using Gap.Seguros.Domain.Repository;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Gap.Seguros.Infrastructure.Repository
{
    /// <summary>
    /// </summary>
    /// <seealso cref="Gap.Seguros.Domain.Repository.IPolizaRepository" />
    public class PolizaRepository : IPolizaRepository
    {
        private readonly GapSegurosContext _dbContext;
        public PolizaRepository(GapSegurosContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public Task<List<PolizaViewModel>> ConsultarPolizas()
        {

            var listaPolizas = (from poliza in _dbContext.Poliza
                                join usuario in _dbContext.Usuario on poliza.UsuarioId equals usuario.Id
                                join tipoRiesgo in _dbContext.TipoRiesgo on poliza.TipoRiesgoId equals tipoRiesgo.Id
                                join tipoCubrimiento in _dbContext.TipoCubrimiento on poliza.TipoCubrimientoId equals tipoCubrimiento.Id
                                join estadoPoliza in _dbContext.EstadoPoliza on poliza.EstadoPolizaId equals estadoPoliza.Id
                                select new PolizaViewModel
                                {
                                    UsuarioId = usuario.Id,
                                    Cliente = usuario.Nombre,
                                    TipoCubrimientoId = tipoCubrimiento.Id,
                                    TipoCubrimiento = tipoCubrimiento.Nombre,
                                    Cobertura = poliza.Cobertura,
                                    Descripcion = poliza.Descripcion,
                                    DuracionMesesCobertura = poliza.DuracionMesesCobertura,
                                    EstadoPolizaId = estadoPoliza.Id,
                                    EstadoPoliza = estadoPoliza.Nombre,
                                    FechaInicioVigencia = poliza.FechaInicioVigencia,
                                    Nombre = poliza.Nombre,
                                    Precio = poliza.Precio,
                                    TipoRiesgoId = tipoRiesgo.Id,
                                    TipoRiesgo = tipoRiesgo.Nombre,
                                    Id = poliza.Id
                                }).ToListAsync();
            return listaPolizas;
        }
    }
}
