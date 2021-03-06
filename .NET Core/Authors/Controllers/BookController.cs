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
    public class BookController : Controller
    {
        private readonly AuthorsContext _context;

        public BookController(AuthorsContext context)
        {
            _context = context;
        }

        // GET: Book
        public async Task<IActionResult> Index()
        {
            var authorsContext = _context.books.Include(b => b.genre);
            return View(await authorsContext.ToListAsync());
        }

        // GET: Book/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var book = await _context.books
                .Include(b => b.genre)
                .Include(b => b.authorBookList)
                    .ThenInclude(authroBook => authroBook.author)
                .FirstOrDefaultAsync(m => m.id == id);
            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        public IActionResult ValidateTitle(int? id, string name){
            IQueryable<Book> query = this._context.books.Where(book => book.name == name);
            if( id != null ){
                query = query.Where (book => book.id != id);
            }
            bool exsists = query.Any ( );
            if(!exsists){
                return Json (true);
            }else{
                return Json ("Title is already taken");
            }
        }

        // GET: Book/Create
        public IActionResult Create()
        {
            ViewData["genreId"] = new SelectList(_context.genres, "id", "name");
            ViewData["authors"] = new MultiSelectList (_context.authors, "id", "fullName");
            return View();
        }

        // POST: Book/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,name,genreId,authors")] Book book)
        {
            if (ModelState.IsValid)
            {
                if(book.authorBookList == null){
                    book.authorBookList = new List<AuthorBook>( );
                }
                foreach( int authorId in book.authors){
                    book.authorBookList.Add (
                        new AuthorBook ( ){
                            authorId = authorId
                        }
                    );
                }
                _context.Add(book);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["genreId"] = new SelectList(_context.genres, "id", "name", book.genreId);
            ViewData["authors"] = new MultiSelectList (_context.authors, "id", "fullName", book.authors);
            return View(book);
        }

        // GET: Book/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var book = await _context.books.Include( book => book.authorBookList ).Where (book => book.id == id).FirstOrDefaultAsync();
            if (book == null)
            {
                return NotFound();
            }
            ViewData["genreId"] = new SelectList(_context.genres, "id", "name", book.genreId);

            IList<int> selectedAuthors = new List<int> ( );
            foreach(AuthorBook  authorBook in book.authorBookList){
                selectedAuthors.Add ( authorBook.authorId );
            }

            ViewData["authors"] = new MultiSelectList (_context.authors, "id", "fullName", selectedAuthors);
            return View(book);
        }

        // POST: Book/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id,name,genreId,authors")] Book book)
        {
            if (id != book.id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(book);

                    this._context.Entry( book ).Collection ( book => book.authorBookList ).Load( );
                    book.authorBookList.Clear( );
                    foreach ( int author in book.authors ){
                        book.authorBookList.Add (
                            new AuthorBook ( ){
                                authorId = author
                            }
                        );
                    }

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BookExists(book.id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["genreId"] = new SelectList(_context.genres, "id", "name", book.genreId);
            return View(book);
        }

        // GET: Book/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var book = await _context.books
                .Include(b => b.genre)
                .Include (b => b.authorBookList)
                    .ThenInclude ( authorBook => authorBook.author )
                .FirstOrDefaultAsync(m => m.id == id);
            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        // POST: Book/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var book = await _context.books.FindAsync(id);
            _context.books.Remove(book);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BookExists(int id)
        {
            return _context.books.Any(e => e.id == id);
        }
    }
}
