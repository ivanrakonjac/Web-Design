using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.Models.Database {

    public class MessagingAppContext : IdentityDbContext<User> {
        public DbSet<Conversation> conversations {get;set;}
        public DbSet<UserConversation> userConversations {get;set;}
        public DbSet<Message> messages {get;set;}

        public MessagingAppContext ( DbContextOptions options ) : base (options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
 
            builder.ApplyConfiguration ( new IdentityRoleConfiguration () );

            builder.ApplyConfiguration ( new ConversationConfiguration () );

            builder.ApplyConfiguration ( new UserConversationConfiguration () );

            builder.ApplyConfiguration ( new MessagesConfiguration () );
        }
    }

}