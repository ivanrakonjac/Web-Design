using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using MessagingApp.Models.Database;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.Models.View{
    public class PostComment {
        [Required]
        public string content { get; set; }
        public ICollection<Comment> comments { get; set; }
    }
}