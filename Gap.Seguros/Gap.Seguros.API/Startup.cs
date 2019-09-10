using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using Gap.Seguros.API.Services;
using Gap.Seguros.Domain.Repository;
using Gap.Seguros.Domain.Services;
using Gap.Seguros.Domain.utils;
using Gap.Seguros.Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace Gap.Seguros.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            //Politicas CORS
            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                            .AllowAnyMethod()
                                                             .AllowAnyHeader()));
            //Parametros de configuracion de appsettings.json
            var configurtionUtilsSection = Configuration.GetSection("utils");
            services.Configure<Configuracion>(configurtionUtilsSection);
            //Autorizacion por token jwt
            var configuracion = configurtionUtilsSection.Get<Configuracion>();
            var llaveCifrado = Encoding.ASCII.GetBytes(configuracion.LlaveCifrado);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(llaveCifrado),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            //Inyeccion de dependencias
            services.AddScoped<IGestionPolizaService, GestionPolizaService>();
            services.AddScoped<IPolizaRepository, PolizaRepository>();
            services.AddScoped<IPolizaService, PolizaService>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IGestionUsuarioService, GestionUsuarioService>();
            services.AddScoped<ITipoRiesgoRepository, TipoRiesgoRepository>();
            services.AddScoped<IGestionTipoRiesgoService, GestionTipoRiesgoService>();
            services.AddScoped<ITipoCubrimientoRepository, TipoCubrimientoRepository>();
            services.AddScoped<IGestionTipoCubrimientoService, GestionTipoCubrimientoService>();
            services.AddScoped<IEstadoPolizaRepository, EstadoPolizaRepository>();
            services.AddScoped<IGestionEstadoPolizaService, GestionEstadoPolizaService>();
            services.AddDbContext<GapSegurosContext>(options => options.UseSqlServer(Configuration.GetConnectionString("sqlServerConnectionString")));
            //Configuracion Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Seguros GAP Api",
                    Description = "Prueba Seguros GAP"
                });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme()
                {
                    Description = "JWT Authorization header {token}",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("AllowAll");
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Seguros GAP Api");
                c.RoutePrefix = string.Empty;
            });
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
