using System;

namespace Gap.Seguros.Domain
{
    /// <summary>
    /// Excepciones de negocio 
    /// </summary>
    /// <seealso cref="System.Exception" />
    [Serializable]
    public class BusinessException : Exception
    {
        public BusinessException(string message)
     : base(message)
        {
        }
    }
}
