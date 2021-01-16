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

namespace MessagingApp.Controllers{

    [Authorize]
    public class ChatController : Controller {

        private UserManager<User> userManager;
        private MessagingAppContext context;

        public ChatController (UserManager<User> userManager, MessagingAppContext context){
            this.userManager = userManager;
            this.context = context;
        }

        public async Task<IndexModel> getIndexModel (int? activeConversation){
             User loggedInUser = await this.userManager.GetUserAsync (base.User);

             IList<Conversation> conversations = await this.context.userConversations
                                                    // Dohvatim sve redove tabele userConversations gde je item.userId == loggedInUser.Id 
                                                    .Where (item => item.userId == loggedInUser.Id)
                                                    // Ucitavam reference ka razgovoru 
                                                    .Include (item => item.conversation)
                                                        // Ucitivam reference u suprotonom smeru
                                                        .ThenInclude (item => item.userConversationList)
                                                            // Ucitavam referencu ka korisniku
                                                            .ThenInclude (item => item.user)
                                                    // Trebaju mi samo razgovori
                                                    .Select ( item => item.conversation )
                                                    .ToListAsync ( );

            IndexModel model = new IndexModel ( ){
                conversations = conversations,
                activeConversation = activeConversation != null ? activeConversation.Value : ( conversations.Count != 0 ? conversations.First().id : -1)
            };

            if( model.activeConversation != -1 ){
                model.messages = await this.context.messages
                                                .Where ( message => message.conversationId == model.activeConversation)
                                                .Include ( item => item.userConversation)
                                                    .ThenInclude ( item => item.user)
                                                .OrderBy ( item => item.sendDate)
                                                .ToListAsync ( );
            } else {
                model.messages = new List<Message> ( );
            }
            model.userId = loggedInUser.Id;

            return model; 
        }

        public async Task<IActionResult> Index(){
            IndexModel model = await this.getIndexModel (null);
            return View ( model );
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateConversation (CreateConversationModel model){
            if( !ModelState.IsValid ){
                return View ( model );
            }

            String name = model.name;

            // Proveramo ima li i jednog selectovanog usera
            bool userSelected = model.userSelectionsList.Select ( item => item.selected ).Aggregate (
                (result, item) => result | item
            );

            if( !userSelected ){
                ModelState.AddModelError ( "", "No user selected!" );
                return View (model);
            }


            /* Provera da li vec postoji cet sa selectovanim korisnicima */

            // Dohvatam ulogovanog korisnika
            User loggedInUser = await this.userManager.GetUserAsync (base.User);

            // Dojvatam selectovane usere i appendujem id ulogovanog usera
            string[] selectedIds = model.userSelectionsList.Where (item => item.selected == true)
                                    .Select (item => item.id)
                                    .Append (loggedInUser.Id)
                                    .ToArray ( );

            bool conversationExists = this.context.userConversations
                                        // da li se item.userId nalazi u kolekciji selektovanih korisnika
                                        .Where (item => selectedIds.Contains (item.userId) )
                                        // grupisem userConversations tabelu po razgovorima
                                        .GroupBy ( item => item.conversationId )
                                        // iz rezultata izvlacim za svaku grupu broj redova sa datom grupom
                                        .Select ( group => new { group.Key, count = group.Count () })
                                        // trebaju mi samo razgovori sa onoliko korisnika koliko je selectovano idjeva
                                        .Where ( item => item.count == selectedIds.Count ( ) )
                                        // postoji li koji takav
                                        .Any ( );

            if(conversationExists) {
                ModelState.AddModelError ("", "Selected users are already in conversations");
                return View ( model );
            }

            /* Kraj provere da li vec postoji cet sa selectovanim korisnicima */

            // pravim novu konverzaciju i inicijalizujem je potrebnim podacima
            Conversation conversation = new Conversation  ( ){
                name = model.name,
                creationDate = DateTime.Now,
                userConversationList = new List<UserConversation> ( )
            };


            // dodajem idjeve u conversation.UserConversationList
            foreach (string id in selectedIds) {
                conversation.userConversationList.Add (
                    new UserConversation ( ){
                        userId = id
                    }
                );
            }

            await this.context.conversations.AddAsync ( conversation );
            await this.context.SaveChangesAsync ( );

            return RedirectToAction ( nameof ( ChatController.Index ) );
        }

        public async Task<IActionResult> ChangeActiveConversation (int conversationId){
            IndexModel model = await this.getIndexModel( conversationId );
            return PartialView ("Index", model );
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendMessage (SendMessageModel model){
            
            // Dohvatam ulogovanog usera
            User loggedInUser = await this.userManager.GetUserAsync ( base.User );
            
            if ( ModelState.IsValid ){
                // Pravim novu poruku
                Message message = new Message ( ){
                    userId = loggedInUser.Id,
                    conversationId = model.conversationId,
                    sendDate = DateTime.Now,
                    content = model.content
                };

                // Stavljam poruku u bazu
                await this.context.messages.AddAsync ( message );
                await this.context.SaveChangesAsync ( );

            }

            // Vracam true da je poruka stavljena u bazu
            return Json ( true );
        }

        public async Task<IActionResult> GetMessages ( int conversationId ){
            User loggedInUser = await this.userManager.GetUserAsync ( base.User );
            MessageOverviewModel messageOverviewModel = new MessageOverviewModel ( ){
                    messages = await this.context.messages
                                                    .Where ( item => item.conversationId == conversationId)
                                                    .Include ( item => item.userConversation)
                                                        .ThenInclude ( item => item.user)
                                                    .OrderBy ( item => item.sendDate)
                                                    .ToListAsync ( ),
                    userId = loggedInUser.Id
            }; 

            return PartialView ( "MessageOverview", messageOverviewModel );
        }
    }
}