using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Authors.Models.Database {
    public class Genre {
        [Key]
       public int id { get; set; }
       [Required]
       public string name { get; set; }

       public ICollection<Book> books { get; set; }
    }


    //klasa nam sluzi za konfiguraciju Zanr tabele prilikom njenog dodavanju u bazu
    public class GenreConfiguration : IEntityTypeConfiguration<Genre>
    {
        public void Configure(EntityTypeBuilder<Genre> builder)
        {
            builder.Property (genre => genre.id).ValueGeneratedOnAdd();

            builder.HasData (
                new Genre []{
                    new Genre(){
                        id = 1,
                        name = "Science fiction"
                    }
                }
            );
        }
    }
}