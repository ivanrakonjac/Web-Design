using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.Models.View{
    public class SendMessageModel {
        [Required]
        public string content { get; set; }
        [HiddenInput]
        public int conversationId { get; set; }
    }
}