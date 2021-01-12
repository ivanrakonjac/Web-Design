using System.Collections.Generic;
using MessagingApp.Models.Database;

namespace MessagingApp.Models.View {
    public class MessageOverviewModel{
        public ICollection<Message> messages { get; set; }
        public string userId { get; set; }
    }
}