using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Authors.Models.Database {
    public class Author {
        [Key]
        public int id { get; set; }
        [Required]
        [Display(Name = "First name")]
        public string firstName { get; set; }
        [Required]
        [Display(Name = "Last name")]
        public string lastName { get; set; }
        [Required]
        [Display(Name = "Country")]
        public string country { get; set; }
        [Display(Name="Books")]

        //setovanje many to many veze
        public ICollection<AuthorBook> authorBookList {get;set;}

        public string fullName => this.firstName + " " + this.lastName;


        public IList<SelectListItem> GetCoutries () {
            bool isUsa = country==null || country=="USA";
            bool isUk = country!=null && country=="UK";
            bool isCanada = country!=null && country=="Canada";
            bool isSerbia = country!=null && country=="Serbia";
            bool isYugoslavia = country!=null && country=="Yugoslavia";


            SelectListItem usa = new SelectListItem("USA", "USA", isUsa);
            SelectListItem uk = new SelectListItem("UK", "UK", isUk);
            SelectListItem canada = new SelectListItem("Canada", "Canada", isCanada);
            SelectListItem serbia = new SelectListItem("Serbia", "Serbia", isSerbia);
            SelectListItem yugoslavia = new SelectListItem("Yugoslavia", "Yugoslavia", isYugoslavia);

            IList<SelectListItem> items = new List<SelectListItem> ();

            items.Add(usa);
            items.Add(uk);
            items.Add(canada);
            items.Add(serbia);
            items.Add(yugoslavia);

            return items;
        }

    }

    //Klasa koja nam sluzi za konfiguraciju Authors tabele u bazi
    public class AuthorConfiguration : IEntityTypeConfiguration<Author> {
        public void Configure(EntityTypeBuilder<Author> builder) {
            
            //setovanje autoincrementa nad id poljem
            builder.Property ( author => author.id )
                .ValueGeneratedOnAdd ( );

            //setovanje pocetnog sadrzaja u bazi, prilikom kreiranja tabele
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