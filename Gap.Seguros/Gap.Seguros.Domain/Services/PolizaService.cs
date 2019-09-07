using Gap.Seguros.Domain.Constants;
using Gap.Seguros.Domain.Model;

namespace Gap.Seguros.Domain.Services
{
    public class PolizaService : IPolizaService
    {
        /// <summary>
        /// Valida si la cobertura de una poliza es valida
        /// </summary>
        /// <param name="poliza">The poliza.</param>
        /// <returns></returns>
        public bool EsValidaCoberturaPoliza(Poliza poliza)
        {
            if ((int)TiposRiesgos.RiesgoAlto == poliza.TipoRiesgoId &&
                poliza.Cobertura > Constantes.COBERTURAMAXIMARIESGOALTO)
            {
                throw new BusinessException(Constantes.EXCEPCIONRIESGOALTOCOBERTURA);
            }
            return true;
        }
    }
}
