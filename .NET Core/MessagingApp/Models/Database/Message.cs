using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MessagingApp.Models.Database{
    public class Message {
        [Key]
        public int id {get; set;}
        [Required]
        public string content {get;set;}    
        [Required]
        public DateTime sendDate {get;set;}


        // Preslikavanje UserConversation - Message je one to many, gde je userConversation one strana a message many strani

        [Required]
        public string userId {get; set;}
        [Required]
        public int conversationId {get; set;}
        public UserConversation userConversation {get;set;}
    }

    public class MessagesConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.Property ( message => message.id )
                .ValueGeneratedOnAdd ( );

            builder
                // Setujem da Message ima referencu na 1 UserConverstion
                .HasOne<UserConversation> ( item => item.userConversation)
                // A sada setujem drugu stranu veze, da 1 UserConversation ima mnogo messages
                .WithMany ( item => item.messages )
                // Setujem da je Strani kljuc u message tabeli (userId,conversationId) 
                .HasForeignKey ( item => new { item.userId, item.conversationId });
        }
    }
}