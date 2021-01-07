using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.Models.Database {

    public class MessagingAppContext : IdentityDbContext<User> {
        public MessagingAppContext ( DbContextOptions options ) : base (options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
 
            builder.ApplyConfiguration ( new IdentityRoleConfiguration () );
        }
    }

}