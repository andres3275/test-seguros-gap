# test-seguros-gap
Prueba tecnica de ingreso a Growth Acceleration Partners

## Artefactos
* Gap.Seguros proyecto backend en .net core 2.2
* GAP_seguros.EAP proyecto de enterprise architect v12 con modelos ER y clases
* sql_scripts scripts DDL y DML del proyecto (motor base de datos usado sql server express) (Método Database first usado)

## Backend Dependencias
* .net core 2.2
* Swashbuckle.AspNet proyecto Web API (NuGet)

## Procedimiento ejecución backend
* Restaurar dependencias del proyecto : dotnet restore en consola proyecto inicial (API)
* Compilar el proyecto: dotnet build en consola proyecto inicial (API)

## Archivo configuracion Backend
La cadena de conexión a la base de datos es configurada en el archivo appsettings.json del proyecto web API en la propiedad sqlServerConnectionString 

## Instrucciones Uso Aplicación
* Para acceder a la aplicación usar las credenciales UserName: alexander Password:12345