using Gap.Seguros.Domain;
using Gap.Seguros.Domain.Model;
using Gap.Seguros.Domain.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Gap.Seguros.UnitTests
{
    [TestClass]
    public class PolizaServiceUTest
    {
        private IPolizaService _polizaService;
        private Poliza _polizaMock;
        private const decimal COBERTURAVALIDARIESGOALTO = 30;
        private const decimal COBERTURAINVALIDARIESGOALTO = 80;
        private const int TIPORIESGOALTO = 4;

        [TestInitialize]
        public void TestInitialize()
        {
            this._polizaService = new PolizaService();
            this._polizaMock = new Poliza();
        }

        [TestMethod]
        public void EsValidaCoberturaPolizaValidaTest()
        {
            this._polizaMock.Cobertura = COBERTURAVALIDARIESGOALTO;
            this._polizaMock.TipoRiesgoId = TIPORIESGOALTO;
            this._polizaService.EsValidaCoberturaPoliza(this._polizaMock);
            Assert.AreEqual(true, this._polizaService.EsValidaCoberturaPoliza(this._polizaMock));
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessException))]
        public void EsValidaCoberturaPolizaInvalidaTest()
        {
            this._polizaMock.Cobertura = COBERTURAINVALIDARIESGOALTO;
            this._polizaMock.TipoRiesgoId = TIPORIESGOALTO;
            this._polizaService.EsValidaCoberturaPoliza(this._polizaMock);
        }
    }
}
