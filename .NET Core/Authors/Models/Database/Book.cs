using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Authors.Models.Database {
    public class Book {
       [Key]
       [Remote(controller:"Book", action:"ValidateTitle", AdditionalFields=nameof(name))]
       public int id { get; set; }
       [Required]
       [Display(Name = "Title")]
       [Remote(controller:"Book", action:"ValidateTitle", AdditionalFields=nameof(id))]
       public string name { get; set; }
       [Required]
       [Display(Name = "Genre")]
       public int genreId { get; set; }
       [Display(Name = "Genre")]
       public Genre genre { get; set; }
       [Display(Name = "Authors")]

       public ICollection<AuthorBook> authorBookList {get;set;} //setovanje many to many veze
       
       [NotMapped]
       [Required]
       [Display(Name = "Authors")]
       public IEnumerable<int> authors {get;set;} 
    }

    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            //setujem da se kljuc generise automatski prilikom dodavanja
            builder.Property(book=> book.id).ValueGeneratedOnAdd();
            
            //dodajem jednu knjigu u bazu
            builder.HasData(
                new Book[]{
                    new Book{
                        id = 1,
                        name = "Red rising",
                        genreId = 1
                    }
                }
            );
        }
    }
}