using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Authors.Models.Database;

namespace Authors.Controllers
{
    public class AuthorController : Controller
    {
        private readonly AuthorsContext _context;

        public AuthorController(AuthorsContext context)
        {
            _context = context;
        }

        // GET: Author
        public async Task<IActionResult> Index()
        {
            return View(await _context.authors.ToListAsync());
        }

        // GET: Author/Details/5
        // int? znaci da je id nullable vrednost
        public async Task<IActionResult> Details(int? id)
        { 
            if (id == null)
            {
                return NotFound();
            }

            var author = await _context.authors
                .Include ( author => author.authorBookList )
                    .ThenInclude (authorBook => authorBook.book)
                .FirstOrDefaultAsync(m => m.id == id);
            if (author == null)
            {
                return NotFound();
            }

            return View(author);
        }

        //provera da li postoji autor sa zadatim imenom i prezimenom
        private bool DoesExist(string firstName, string lastName){
            return this._context.authors.Where(
                author => author.firstName == firstName && author.lastName == lastName
            ).Any();
        }

        // GET: Author/Create
        public IActionResult Create()
        {
            //da mi pri iscrtavanju Create viewa ne bi pukao program na null pristupu modelu
            Author author = new Author();
            return View(author);
        }

        // POST: Author/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,firstName,lastName,country")] Author author)
        {
            if (ModelState.IsValid)
            {
                if(!this.DoesExist(author.firstName, author.lastName)){
                    _context.Add(author);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }else{
                    ModelState.AddModelError("", "Author already exists!");
                }
            }
            return View(author);
        }

        // GET: Author/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var author = await _context.authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }
            return View(author);
        }

        // POST: Author/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id,firstName,lastName,country")] Author author)
        {
            if (id != author.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                //proveravam da li je menjano ime ili country
                bool isOld = this._context.authors.Where(
                    dauthor => dauthor.id == author.id && dauthor.firstName == author.firstName && dauthor.lastName==author.lastName
                ).Any();

                if(isOld || !this.DoesExist(author.firstName, author.lastName)){
                     //try catch blok zbog utrkivanja
                    try
                    {
                        _context.Update(author);
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!AuthorExists(author.id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                    return RedirectToAction(nameof(Index));
                }else{
                    ModelState.AddModelError("", "Author already exists");
                }

            }
            return View(author);
        }

        // GET: Author/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var author = await _context.authors
                .Include ( author => author.authorBookList )
                    .ThenInclude ( authorBook => authorBook.book)
                .FirstOrDefaultAsync(m => m.id == id);
            if (author == null)
            {
                return NotFound();
            }

            return View(author);
        }

        // POST: Author/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var author = await _context.authors.FindAsync(id);
            _context.authors.Remove(author);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AuthorExists(int id)
        {
            return _context.authors.Any(e => e.id == id);
        }
    }
}
