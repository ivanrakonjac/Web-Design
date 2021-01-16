using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MessagingApp.Models.Database{
    public class Comment {
        [Key]
        public int id {get; set;}
        [Required]
        public string content {get;set;}    
        [Required]
        public DateTime sendDate {get;set;}


        [Required]
        public string userId {get; set;}
        public User user {get;set;}
    }

    public class CommentsConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.Property ( comment => comment.id )
                .ValueGeneratedOnAdd ( );

            builder
                // setujem da komentar ima 1 usera
                .HasOne<User> ( item => item.user)
                // a da svaki user ima vise komentara
                .WithMany ( item => item.comments )
                // i da je strani kljuc u komentaru userId
                .HasForeignKey ( item => item.userId);
        }
    }
}