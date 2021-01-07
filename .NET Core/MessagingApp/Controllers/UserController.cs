using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MessagingApp.Models.Database;
using MessagingApp.Models.View;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static MessagingApp.Models.Database.IdentityRoleConfiguration;

namespace MessagingApp.Controllers{

    public class UserController : Controller {

        private MessagingAppContext context;
        private UserManager<User> userManager;

        private IMapper mapper;

        public UserController ( MessagingAppContext context, UserManager<User> userManager, IMapper mapper){
            this.context = context;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        
        public IActionResult isEmailUnique( string email ){
            bool exists = this.context.Users.Where (user => user.Email == email).Any ( );

            if(exists){
                return Json("Email already taken");
            }else{
                return Json(true);
            }

        }

        public IActionResult isUsernameUnique( string username ){
            bool exists = this.context.Users.Where (user => user.UserName == username).Any ( );

            if(exists){
                return Json("Username already taken");
            }else{
                return Json(true);
            }

        }

        public IActionResult Register ( ) {
            return View ( );
        }

        [HttpPost]
        [ValidateAntiForgeryToken] //Anotacija koja nam obezbedjuje da zahtev dolazi iskljucivo iz nase aplikacije
        public async Task<IActionResult> Register (RegisterModel model ) {

            if(!ModelState.IsValid){
                return View ( model );
            }

            User user = this.mapper.Map<User>(model);

            IdentityResult result = await this.userManager.CreateAsync (user, model.password);

            if( !result.Succeeded ){
                foreach( IdentityError error in result.Errors ){
                    ModelState.AddModelError ("", error.Description);
                }

                return View (model);
            }

            result = await this.userManager.AddToRoleAsync( user, Roles.user.Name );

            if( !result.Succeeded ){
                foreach( IdentityError error in result.Errors ){
                    ModelState.AddModelError ("", error.Description);
                }

                return View (model);
            }

            return RedirectToAction ( nameof (HomeController.Index), "Home" );
        }

    }

}