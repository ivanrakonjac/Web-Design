using Microsoft.EntityFrameworkCore;

namespace Authors.Models.Database {
    public class AuthorsContext : DbContext {
        public AuthorsContext ( DbContextOptions options ) : base ( options ) { }

        public DbSet<Author> authors { get; set; }
        public DbSet<Genre> genres { get; set; }
        public DbSet<Book> books { get; set; }
        public DbSet<AuthorBook> authorBook { get; set; }

        protected override void OnModelCreating ( ModelBuilder builder ) {
            base.OnModelCreating ( builder );

            //primenjujemo konfiguracione klase
            builder.ApplyConfiguration ( new AuthorConfiguration ( ) );
            builder.ApplyConfiguration ( new GenreConfiguration ( ) );
            builder.ApplyConfiguration ( new BookConfiguration ( ) );
            builder.ApplyConfiguration ( new AuthorBookConfiguration ( ) );
        }
    }
}