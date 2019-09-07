USE [GapSeguros]
GO

INSERT INTO [dbo].[EstadoPoliza]
           ([id]
           ,[nombre]
           ,[descripcion])
     VALUES
           (1,'activa','Poliza Activa'),
		   (2,'cancelada','Poliza Cancelada')
GO

INSERT INTO [dbo].[TipoRiesgo]
           ([id]
           ,[nombre]
           ,[descripcion])
     VALUES
           (1,'bajo','Riesgo Bajo'),
		   (2,'medio','Riesgo medio'),
		   (3,'medio-alto','Riesgo medio alto'),
		   (4,'alto','Riesgo alto')
GO

INSERT INTO [dbo].[TipoCubrimiento]
           ([id]
           ,[nombre]
           ,[descripcion])
     VALUES
           (1,'Terremoto','cubrimiento por Terremoto'),
		   (2,'Incendio','cubrimiento por Incendio'),
		   (3,'Robo','cubrimiento por Robo'),
		   (4,'Perdida','cubrimiento por Perdida')
GO

INSERT INTO [dbo].[Usuario]
           ([nombre]
           ,[cedula]
           ,[nombreUsuario]
           ,[contrasenia])
     VALUES
           ('Alexander Vargas' ,'1056699885','',''),
		   ('Daniela Morales' ,'1056658885','','')
GO


