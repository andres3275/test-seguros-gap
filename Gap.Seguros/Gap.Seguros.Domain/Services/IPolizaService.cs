using Gap.Seguros.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gap.Seguros.Domain.Services
{
    public interface IPolizaService
    {
        /// <summary>
        /// Valida si la cobertura de una poliza es valida
        /// </summary>
        /// <param name="poliza">The poliza.</param>
        bool EsValidaCoberturaPoliza(Poliza poliza);
    }
}
