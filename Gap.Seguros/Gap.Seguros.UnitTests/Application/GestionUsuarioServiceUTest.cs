

using Gap.Seguros.API.Services;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Repository;
using Gap.Seguros.Domain.utils;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Threading.Tasks;

namespace Gap.Seguros.UnitTests.Application
{
    [TestClass]
    public class GestionUsuarioServiceUTest
    {
        private MockRepository _mockRepository;
        private Mock<IUsuarioRepository> _mockusuarioRepository;
        private IOptions<Configuracion> _options;
        private Usuario _usuario;

        [TestInitialize]
        public void TestInitialize()
        {
            Configuracion configuracion = new Configuracion
            {
                LlaveCifrado = "axnm233544cafgsakkjnopottssddffaasdcssaadfgg"
            };
            this._usuario = new Usuario
            {
                Contrasenia = "abc",
                NombreUsuario = "abc"
            };
            this._mockRepository = new MockRepository(MockBehavior.Strict);
            this._mockusuarioRepository = this._mockRepository.Create<IUsuarioRepository>();
            this._options = Options.Create<Configuracion>(configuracion);
        }

        [TestCleanup]
        public void TestCleanup()
        {
            this._mockRepository.VerifyAll();
        }

        /// <summary>
        /// Test unitario de autenticacion exitosa
        /// </summary>
        [TestMethod]
        public void AutenticarValidoTest()
        {
            IGestionUsuarioService unitUnderTest = new GestionUsuarioService(this._mockusuarioRepository.Object, this._options);
            this._mockusuarioRepository.Setup(x => x.ConsultarXNombreUsuarioContrasenia(It.IsAny<Usuario>()))
                .Returns(Task.FromResult(this._usuario));
            string result = unitUnderTest.Autenticar(this._usuario).Result;
            Assert.IsNotNull(result);
        }

        /// <summary>
        /// Test unitario de autenticacion Erroneo
        /// </summary>
        [TestMethod]
        public void AutenticarInValidoTest()
        {
            IGestionUsuarioService unitUnderTest = new GestionUsuarioService(this._mockusuarioRepository.Object, this._options);
            this._mockusuarioRepository.Setup(x => x.ConsultarXNombreUsuarioContrasenia(It.IsAny<Usuario>()))
                .Returns(Task.FromResult(It.IsAny<Usuario>()));
            string result = unitUnderTest.Autenticar(this._usuario).Result;
            Assert.IsNull(result);
        }
    }
}
