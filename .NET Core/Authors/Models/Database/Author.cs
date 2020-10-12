using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Authors.Models.Database {
    public class Author {
        [Key]
        public int id { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string country { get; set; }
    }

    public class AuthorConfiguration : IEntityTypeConfiguration<Author> {
        public void Configure(EntityTypeBuilder<Author> builder) {
            builder.Property ( author => author.id )
                .ValueGeneratedOnAdd ( );

            builder.HasData (
                new Author ( ) {
                    id = 1,
                    firstName = "Pierce",
                    lastName = "Brown",
                    country = "United States"
                }
            );
        }
    }
}