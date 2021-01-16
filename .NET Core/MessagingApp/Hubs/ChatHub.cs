using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace MessagingApp.Hubs {
    public class ChatHub : Hub {
        public async Task AddToGroup ( string  groupName ){
            await base.Groups.AddToGroupAsync ( base.Context.ConnectionId, groupName );
        }

        public async Task MessageSent ( string groupName ){
            await base.Clients.Group ( groupName ).SendAsync ( "UpdateMessages" );
        }

        public async Task ChangeGroup ( string oldGroupName, string newGroupName ){
            await base.Groups.RemoveFromGroupAsync ( base.Context.ConnectionId, oldGroupName );
            await base.Groups.AddToGroupAsync ( base.Context.ConnectionId, newGroupName );
        }

        public async Task CommentPosted ( ){
            await base.Clients.All.SendAsync ( "UpdatePosts" );
        }
    }
}