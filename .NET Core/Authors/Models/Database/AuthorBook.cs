using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Authors.Models.Database {
    public class AuthorBook {
       public int authorId { get; set; }
       public Author author { get; set; }

       public int bookId { get; set; }
       public Book book { get; set; }
    }

    public class AuthorBookConfiguration : IEntityTypeConfiguration<AuthorBook>
    {
        //ovde podesavamo da je primarni kljuc compozitni iz 2 tabele
        public void Configure(EntityTypeBuilder<AuthorBook> builder)
        {

            builder.HasKey (
                entity => new { entity.authorId, entity.bookId }
            );

            builder.HasData(
                new AuthorBook[]{
                    new AuthorBook(){
                        authorId = 1,
                        bookId = 1
                    }
                }
            );
        }
    }
}