using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gap.Seguros.Domain.Constants;
using Microsoft.EntityFrameworkCore;

namespace Gap.Seguros.Infrastructure.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {

        private readonly GapSegurosContext _dbContext;

        public UsuarioRepository(GapSegurosContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public Task<List<Usuario>> ConsultarClientes()
        {
            var listaClientes = (from usuario in _dbContext.Usuario
                                 where usuario.TipoUsuarioId == (int)TiposUsuarios.Cliente
                                 select usuario).ToListAsync();
            return listaClientes;
        }
    }
}
