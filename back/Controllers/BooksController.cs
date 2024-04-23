using back.Data;
using back.DTO;
using back.Models;
using back.Models.Enums;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Books.ToListAsync();

            var bookListDto = new List<BookListDto>();
            foreach (var book in books){
                var author = await _context.Authors.FindAsync(book.AuthorId); 
                var bookDto = new BookListDto{
                    Id = book.Id,
                    Title = book.Title,
                    Description = book.Description,
                    Category = book.Category,
                    Rating = book.Rating,
                    Year = book.Year,
                    Image = book.Image,
                    Price = book.Price,
                    AuthorName = author.Name,
                    Type = (BookType)book.Type
                };
                bookListDto.Add(bookDto);
            }
            return Ok(bookListDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooksAsync(Guid id)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            return Ok(existingBook);
        }


        // Kur e krijon ni book e shtin te ni autor direkt dmth qekjo e kryn qat funksion e mahershum qe e komentova
        [HttpPost]
        public async Task<IActionResult> PostAsync(BookAddDto book)
        {
            //qetu e merr autorin edhe ja shtin ose bookit autorin dmth t vyn ni autorId pej frontit

            var author = await _context.Authors.FindAsync(book.AuthorId);
            if (author == null) return BadRequest("Author Doesn't exist");

            var newbook = new Book
            {
                Id = new Guid(),
                Title = book.Title,
                Author = author,
                AuthorId = author.Id,
                Category = book.Category,
                Rating = book.Rating,
                Description = book.Description,
                Image = book.Image,
                Year = book.Year,
                Price = book.Price

            };

            _context.Books.Add(newbook);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Book books)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = books.Title;
            existingBook.Author = books.Author;
            existingBook.Category = books.Category;
            existingBook.Rating = books.Rating;
            existingBook.Description = books.Description;
            existingBook.Image = books.Image;
            existingBook.Year = books.Year;
            existingBook.Price = books.Price;


            _context.SaveChanges();

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Books.Remove(existingBook);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
