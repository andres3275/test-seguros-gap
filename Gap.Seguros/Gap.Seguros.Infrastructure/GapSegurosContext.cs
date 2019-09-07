using Gap.Seguros.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Gap.Seguros.Infrastructure.Repository
{
    public partial class GapSegurosContext : DbContext
    {
        public GapSegurosContext()
        {
        }

        public GapSegurosContext(DbContextOptions<GapSegurosContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EstadoPoliza> EstadoPoliza { get; set; }
        public virtual DbSet<Poliza> Poliza { get; set; }
        public virtual DbSet<TipoCubrimiento> TipoCubrimiento { get; set; }
        public virtual DbSet<TipoRiesgo> TipoRiesgo { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuario { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("data source=DESKTOP-3O7SPK8\\SQLEXPRESS;initial catalog=GapSeguros;persist security info=False;user id=sa;password=12345;MultipleActiveResultSets=True;App=EntityFramework");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<EstadoPoliza>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Poliza>(entity =>
            {
                entity.HasIndex(e => e.EstadoPolizaId)
                    .HasName("IXFK_Poliza_EstadoPoliza");

                entity.HasIndex(e => e.TipoCubrimientoId)
                    .HasName("IXFK_Poliza_TipoCubrimiento");

                entity.HasIndex(e => e.TipoRiesgoId)
                    .HasName("IXFK_Poliza_TipoRiesgo");

                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IXFK_Poliza_Usuario");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cobertura)
                    .HasColumnName("cobertura")
                    .HasColumnType("decimal(18, 5)");

                entity.Property(e => e.Descripcion)
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);

                entity.Property(e => e.DuracionMesesCobertura).HasColumnName("duracionMesesCobertura");

                entity.Property(e => e.EstadoPolizaId).HasColumnName("estadoPolizaId");

                entity.Property(e => e.FechaInicioVigencia).HasColumnName("fechaInicioVigencia");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasMaxLength(50);

                entity.Property(e => e.Precio)
                    .HasColumnName("precio")
                    .HasColumnType("decimal(30, 5)");

                entity.Property(e => e.TipoCubrimientoId).HasColumnName("tipoCubrimientoId");

                entity.Property(e => e.TipoRiesgoId).HasColumnName("tipoRiesgoId");

                entity.Property(e => e.UsuarioId).HasColumnName("usuarioId");

                entity.HasOne(d => d.EstadoPoliza)
                    .WithMany(p => p.Poliza)
                    .HasForeignKey(d => d.EstadoPolizaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Poliza_EstadoPoliza");

                entity.HasOne(d => d.TipoCubrimiento)
                    .WithMany(p => p.Poliza)
                    .HasForeignKey(d => d.TipoCubrimientoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Poliza_TipoCubrimiento");

                entity.HasOne(d => d.TipoRiesgo)
                    .WithMany(p => p.Poliza)
                    .HasForeignKey(d => d.TipoRiesgoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Poliza_TipoRiesgo");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Poliza)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Poliza_Usuario");
            });

            modelBuilder.Entity<TipoCubrimiento>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TipoRiesgo>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasIndex(e => e.TipoUsuarioId)
                    .HasName("IXFK_Usuario_TipoUsuario");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cedula)
                    .IsRequired()
                    .HasColumnName("cedula")
                    .HasMaxLength(50);

                entity.Property(e => e.Contrasenia)
                    .IsRequired()
                    .HasColumnName("contrasenia")
                    .HasMaxLength(200);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(150);

                entity.Property(e => e.NombreUsuario)
                    .IsRequired()
                    .HasColumnName("nombreUsuario")
                    .HasMaxLength(50);

                entity.Property(e => e.TipoUsuarioId).HasColumnName("tipoUsuarioId");

                entity.HasOne(d => d.TipoUsuario)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.TipoUsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Usuario_TipoUsuario");
            });
        }
    }
}
