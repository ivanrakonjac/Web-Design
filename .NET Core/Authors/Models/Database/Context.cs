using Microsoft.EntityFrameworkCore;

namespace Authors.Models.Database {
    public class AuthorsContext : DbContext {
        public AuthorsContext ( DbContextOptions options ) : base ( options ) { }

        public DbSet<Author> authors { get; set; }

        protected override void OnModelCreating ( ModelBuilder builder ) {
            base.OnModelCreating ( builder );

            builder.ApplyConfiguration ( new AuthorConfiguration ( ) );
        }
    }
}