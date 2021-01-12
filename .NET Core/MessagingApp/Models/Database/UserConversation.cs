using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MessagingApp.Models.Database{
    public class UserConversation {
        public string userId {get; set;}
        public User user {get; set;}
        public int conversationId {get;set;}
        public Conversation conversation {get;set;}
    }

    public class UserConversationConfiguration : IEntityTypeConfiguration<UserConversation>
    {
        public void Configure(EntityTypeBuilder<UserConversation> builder)
        {
            builder.HasKey (
                entity => new { entity.userId, entity.conversationId }
            );
        }
    }
}