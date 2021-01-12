using System.Collections.Generic;
using MessagingApp.Models.Database;

namespace MessagingApp.Models.View {
    public class IndexModel {
        public ICollection<Conversation> conversations { get; set; }
        public int activeConversation {get; set;}
    }
}