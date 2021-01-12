using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MessagingApp.Models.Database{
    public class Conversation {
        [Key]
        public int id {get;set;}
        [Required]
        public string name {get;set;}
        [Required]
        public DateTime creationDate {get;set;}

        public ICollection<UserConversation> userConversationList {get;set;}
    }

    public class ConversationConfiguration : IEntityTypeConfiguration<Conversation>{
    
        public void Configure(EntityTypeBuilder<Conversation> builder)
        {
            builder.Property (conversation => conversation.id).ValueGeneratedOnAdd ( );

            builder.HasAlternateKey ( conversation => conversation.name );
        }
    }
}