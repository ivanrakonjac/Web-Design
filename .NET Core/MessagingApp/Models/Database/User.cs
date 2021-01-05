using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MessagingApp.Models.Database{

    public class User : IdentityUser{
        [Required]
        public string firstName {get; set; }
        [Required]
        public string lastName {get; set; }
    }
    
}