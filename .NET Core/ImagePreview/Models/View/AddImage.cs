using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ImagePreview.Models.View {
    public class AddImageModel {
        [Required]
        [Display ( Name = "Name" )]
        public string name { get; set; }
        [Required]
        [Display ( Name = "File" )]
        public IFormFile file { get; set; }
    }
}