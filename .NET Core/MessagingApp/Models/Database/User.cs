using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using MessagingApp.Models.View;
using Microsoft.AspNetCore.Identity;

namespace MessagingApp.Models.Database{

    public class User : IdentityUser{
        [Required]
        public string firstName {get; set; }
        [Required]
        public string lastName {get; set; }
        public ICollection<UserConversation> UserConversationList {get;set;}

        public ICollection<Comment> comments { get; set; }  
    }

    public class UserProfile : Profile {
        public UserProfile(){
            base.CreateMap<RegisterModel, User> ( )
                .ForMember(
                    destination => destination.Email,
                    options => options.MapFrom (data => data.email)
                )
                .ForMember(
                    destination => destination.UserName,
                    options => options.MapFrom (data => data.username)
                )
                .ReverseMap ( );
                
        }
    }
    
}