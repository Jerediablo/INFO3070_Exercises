namespace ExercisesDAL
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class SomeSchoolContext : DbContext
    {
        public SomeSchoolContext()
            : base("name=SomeSchoolContext")
        {
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Division> Divisions { get; set; }
        public virtual DbSet<Grade> Grades { get; set; }
        public virtual DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Course>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Course>()
                .HasMany(e => e.Grades)
                .WithRequired(e => e.Cours)
                .HasForeignKey(e => e.CourseId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Division>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Division>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Division>()
                .HasMany(e => e.Courses)
                .WithRequired(e => e.Division)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Division>()
                .HasMany(e => e.Students)
                .WithRequired(e => e.Division)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Grade>()
                .Property(e => e.Comments)
                .IsUnicode(false);

            modelBuilder.Entity<Grade>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Student>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Student>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<Student>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<Student>()
                .Property(e => e.PhoneNo)
                .IsUnicode(false);

            modelBuilder.Entity<Student>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Student>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Student>()
                .HasMany(e => e.Grades)
                .WithRequired(e => e.Student)
                .WillCascadeOnDelete(false);
        }
    }
}
