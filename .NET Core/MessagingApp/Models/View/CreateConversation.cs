using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.Models.View{
    public class UserSelection {
        [HiddenInput]
        public string label {get; set; }
        [HiddenInput]
        public string id {get; set; }
        public bool selected {get; set; }
    }
    public class CreateConversationModel{
        [Required]
        [Display ( Name = "Name" )]
        public string name { get; set; }
        
        [Required]
        [Display ( Name = "Users" )]
        public UserSelection[] userSelectionsList { get; set; }
    }
}