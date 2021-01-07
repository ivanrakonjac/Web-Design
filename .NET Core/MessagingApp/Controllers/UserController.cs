using Microsoft.AspNetCore.Mvc;

namespace MessagingApp.Controllers{

    public class UserController : Controller {
        
        public IActionResult Register ( ) {
            return View ( );
        }

    }

}