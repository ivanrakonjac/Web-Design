using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessagingApp.Models.Database;
using MessagingApp.Models.View;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MessagingApp.Controllers
{
    [Authorize]
    public class CommentsController : Controller
    {
        private UserManager<User> userManager;
        private MessagingAppContext context;

        public CommentsController (UserManager<User> userManager, MessagingAppContext context){
            this.userManager = userManager;
            this.context = context;
        }

        public async Task<IActionResult> IndexAsync()
        {
            IList<Comment> comments = await this.context.comments.Where (item => true).ToListAsync();

            PostComment postCommentModel = new PostComment (){
                comments = comments != null ? comments : new List<Comment> ()
            };

            return View ( postCommentModel );
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> PostComment (PostComment model){
            
            // Dohvatam ulogovanog usera
            User loggedInUser = await this.userManager.GetUserAsync ( base.User );
            
            if ( ModelState.IsValid ){
                // Pravim novi komentar
                
                Comment comment = new Comment () {
                    userId = loggedInUser.Id,
                    sendDate = DateTime.Now,
                    content = model.content
                };

                // Stavljam komentar u bazu
                await this.context.comments.AddAsync ( comment );
                await this.context.SaveChangesAsync ( );

                IList<Comment> comments = await this.context.comments.Where (item => true).ToListAsync();

                model.comments = comments != null ? comments : new List<Comment> ();

            }else{
                IList<Comment> comments = await this.context.comments.Where (item => true).ToListAsync();
                model.comments = comments != null ? comments : new List<Comment> ();

                ModelState.AddModelError ( "", "Add text!" );
                return View ( "Index", model );
            }

            // Vracam true da je poruka stavljena u bazu
            return Json ( true );

            //return PartialView ("CommentOverview", model);
        }

        public async Task<IActionResult> GetComments ( ){
            IList<Comment> comments = await this.context.comments.Where (item => true).ToListAsync();

            PostComment postComment = new PostComment (){
                comments = comments
            };

            return PartialView ("CommentsOverview", postComment);
        }

    }
}
