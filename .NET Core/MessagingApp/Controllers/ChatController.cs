using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessagingApp.Models.Database;
using MessagingApp.Models.View;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.Controllers{

    [Authorize]
    public class ChatController : Controller {

        private UserManager<User> userManager;
        private MessagingAppContext context;

        public ChatController (UserManager<User> userManager, MessagingAppContext context){
            this.userManager = userManager;
            this.context = context;
        }

        public IActionResult Index(){
            return View ( );
        }

        public async Task<IActionResult> CreateConversationAsync ( ) {
            User loggedInUser = await this.userManager.GetUserAsync (base.User);
            IList<User> users = await this.context.Users.Where (user => user.Id != loggedInUser.Id).ToListAsync ();

            UserSelection[] userSelections = users.Select (
                    user => new UserSelection ( ){
                        label = user.UserName + ", " + user.firstName + ", " + user.lastName,
                        id = user.Id,
                        selected = false
                    }
            ).ToArray ( );

            CreateConversationModel model= new CreateConversationModel () {
                userSelectionsList = userSelections
            };

            return View ( model );
        }
    }
}