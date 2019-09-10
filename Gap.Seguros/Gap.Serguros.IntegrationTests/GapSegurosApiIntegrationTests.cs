using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Dto;
using Xunit;
using Gap.Seguros.API;
using System.Net.Http.Headers;
using Gap.Serguros.IntegrationTests.utils;

namespace Gap.Serguros.IntegrationTests
{
    public class GapSegurosApiIntegrationTests : IClassFixture<TestFixture<Startup>>
    {
        private HttpClient _client;

        public GapSegurosApiIntegrationTests(TestFixture<Startup> fixture)
        {
            this._client = fixture.Client;
            this._client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFsZXhhbmRlciIsIm5iZiI6MTU2ODA1NjgzMCwiZXhwIjoxNTY4NjYxNjMwLCJpYXQiOjE1NjgwNTY4MzB9.2vfEhZxsyvELANg7nIQ-wOsCGtnMKzfw8JgPOEYCEeo");
        }

        [Fact]
        public async Task ConsultarTiposRiesgo()
        {
            var request = "/api/TipoRiesgo/consultarTiposRiesgos";
            // Act
            var response = await this._client.GetAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task ConsultarTiposCubrimiento()
        {
            var request = "/api/TipoCubrimiento/consultarTiposCubrimientos";
            // Act
            var response = await this._client.GetAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task ConsultarClientes()
        {
            var request = "/api/Usuario/consultarClientes";
            // Act
            var response = await this._client.GetAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task ConsultarPolizas()
        {
            var request = "/api/Poliza/consultarPolizas";
            // Act
            var response = await this._client.GetAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task ConsultarEstadosPoliza()
        {
            var request = "/api/EstadoPoliza/consultarEstadosPoliza";
            // Act
            var response = await this._client.GetAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact(Skip = "Es necesario identificar un id de poliza de base de datos y reemplazarlo en idPolizaEliminar")]
        public async Task EliminarPoliza()
        {
            int idPolizaEliminar = 7;
            var request = "/api/Poliza/eliminarPoliza/" + idPolizaEliminar;
            // Act
            var response = await this._client.DeleteAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task CrearPoliza()
        {
            var url = "/api/Poliza/crearPoliza";
            Poliza poliza = new Poliza
            {
                Nombre = "Poliza",
                Descripcion = "Una poliza",
                Cobertura = 5,
                DuracionMesesCobertura = 9,
                EstadoPolizaId = 1,
                FechaInicioVigencia = DateTime.Now,
                Precio = 5666,
                TipoCubrimientoId = 1,
                TipoRiesgoId = 1,
                UsuarioId = 2
            };
            // Act
            var response = await this._client.PostAsync(url, ContentHelper.GetStringContent(poliza));

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact(Skip = "Es necesario identificar la poliza que se va a modificar de base de datos y reemplazarlo en poliza")]
        public async Task EditarPoliza()
        {
            var url = "/api/Poliza/editarPoliza";
            Poliza poliza = new Poliza
            {
                Nombre = "Poliza modificada",
                Descripcion = "Una poliza modificada",
                Cobertura = 7,
                DuracionMesesCobertura = 8,
                EstadoPolizaId = 2,
                FechaInicioVigencia = DateTime.Now,
                Precio = 5666,
                TipoCubrimientoId = 2,
                TipoRiesgoId = 2,
                UsuarioId = 3,
                Id = 13
            };
            // Act
            var response = await this._client.PutAsync(url, ContentHelper.GetStringContent(poliza));

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task Autenticar()
        {
            var url = "/api/Usuario/autenticar";
            Usuario usuario = new Usuario
            {
                NombreUsuario = "alexander",
                Contrasenia = "827ccb0eea8a706c4c34a16891f84e7b"
            };
            // Act
            var response = await this._client.PostAsync(url, ContentHelper.GetStringContent(usuario));

            // Assert
            response.EnsureSuccessStatusCode();
        }
    }
}
