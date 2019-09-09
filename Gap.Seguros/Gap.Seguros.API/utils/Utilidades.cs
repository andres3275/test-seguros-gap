using Gap.Seguros.Domain.Model;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Gap.Seguros.API.utils
{
    /// <summary>
    /// Clase estatica con funciones de utilidades generales
    /// </summary>
    public static class Utilidades
    {

        private const int TIEMPOEXPIRACIONTOKENJWT = 7;

        /// <summary>
        /// Genera un hash Md5 a partir de un valor
        /// </summary>
        /// <param name="valor">The valor.</param>
        /// <returns></returns>
        public static string GenerarMd5Hash(string valor)
        {
            string hash;
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(valor));
                StringBuilder sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                hash = sBuilder.ToString();
            }
            return hash;
        }

        /// <summary>
        /// Genera un token jwt en base a informacion del usuario autenticadoy a una llave de cifrado.
        /// </summary>
        /// <param name="usuario">The usuario.</param>
        /// <param name="llaveCifrado">The llave cifrado.</param>
        /// <returns></returns>
        public static string GenerarTokenJwt(Usuario usuario, string llaveCifrado)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(llaveCifrado);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.NombreUsuario.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(TIEMPOEXPIRACIONTOKENJWT),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
