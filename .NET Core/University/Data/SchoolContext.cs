using University.Models;
using Microsoft.EntityFrameworkCore;

namespace University.Data
{
    //The main class that coordinates Entity Framework functionality for a given data model is the database context class
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
        }
        
        // This code creates a DbSet property for each entity set. In Entity Framework terminology,
        // an entity set typically corresponds to a database table, and an entity corresponds to a row in the table.
        public DbSet<Course> Courses { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Student> Students { get; set; }
        

        //For overriding the default behavior by specifying singular table names in the DbContext
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>().ToTable("Course");
            modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
            modelBuilder.Entity<Student>().ToTable("Student");
        }
    }
}