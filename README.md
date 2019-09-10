# test-seguros-gap
Prueba tecnica de ingreso a Growth Acceleration Partners

## Artefactos
* Gap.Seguros proyecto backend en .net core 2.2
* GapSegurosWeb proyecto frontend en angular 8
* GAP_seguros.EAP proyecto de enterprise architect v12 con modelos ER y clases
* sql_scripts scripts DDL y DML del proyecto (motor base de datos usado sql server express) (Método Database first usado) (Ejecutar segun enumeración)

## Dependencias
* backend .net core 2.2
* frontend nodejs, npm, angular cli 8.3.3
* base de datos sql server 2012+

## Archivo configuracion Backend
* La cadena de conexión a la base de datos es configurada en el archivo appsettings.json del proyecto web API en la propiedad sqlServerConnectionString.
* El parametro de configuración llaveCifrado es utilizada para generar el token jwt, si se desea cambiar, la cadena debe ser de 128 bits de longitud.

## Procedimiento ejecución backend
* Ejecutar los script DDL y DML del directorio sql_scripts en el orden de enumeración asignado
* Restaurar dependencias del proyecto : dotnet restore en consola proyecto inicial (API) o compilar en visual studio
* Compilar el proyecto: dotnet build en consola proyecto inicial (API) o compilar en visual studio
* Ejecutar el proyecto: dotnet run en consola proyecto inicial (API) o ejecutar en visual studio
* Si se ejecuta por kestrel (recomendado) el backend iniciara en la url: http://localhost:5000
* Al ir a la dirección http://localhost:5000  sera cargada la interfaz swagger donde se podrá interactuar con los endpoints creados

## Uso swagger
* Para probar los endpoints es necesario añadir el token jwt dando click al boton Authorize y en el campo value digitar:
bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFsZXhhbmRlciIsIm5iZiI6MTU2ODA1NjgzMCwiZXhwIjoxNTY4NjYxNjMwLCJpYXQiOjE1NjgwNTY4MzB9.2vfEhZxsyvELANg7nIQ-wOsCGtnMKzfw8JgPOEYCEeo
* El usuario ahora podra probar los endpoints expuestos.

## Archivo configuracion Frontend
* La url de la api donde se encuentran los endpoint expuestos es configurada en el archivo environment.ts (src/environments).
* El nombre de la propiedad es apiUrl  el valor es 'http://localhost:5000/api' para el caso de que el backend se encuentre desplegado en el servidor kestrel.

## Procedimiento Ejecución frontend
* Restaurar dependencias del proyecto: npm install
* Ejecución del proyecto en servidor de pruebas ng s.
* La aplicación sera desplegada en un servidor de pruebas en la url http://localhost:4200

## Instrucciones Uso Aplicación
* La aplicación redirecciona a la pantalla de login
* Para acceder a la aplicación usar las credenciales UserName: alexander Password:12345
* La aplicación redirecciona a la pantalla de administración de póliza.
* Para cerrar sesión dar click en el icono de la flecha en la parte superior derecha.
* Para consultar Pólizas dar click en boton consultar pólizas
* Para crear una Póliza dar click en boton crear póliza.
* Para eliminar una Póliza, en la ultima columna de la tabla se encuentra un icono basurero, dar click en el.
* Para editar una Póliza,  en la ultima columna de la tabla se encuentra un icono lapiz, dar click en el.
* Para cancelar una cantidad deseada de Pólizas debe seleccionar las pólizas en la caja de selección y dar click en cancelar póliza
* Para cambiar el cliente de una póliza debe seleccionar de la lista de selección el cliente, a continuación debe seleccionar las pólizas de las cajas de selección y por ultimo dar click en boton asignar pólizas cliente
