using back.Data;
using back.DTO;
using back.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Review.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooksAsync(Guid id)
        {
            var existingBook = await _context.Review.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            return Ok(existingBook);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(ReviewDto book)
        {
            var newbook = new Review
            {
                Id = new Guid(),
                BookId = book.BookId,
                UserName = book.UserName,
                Comment = book.Comment,
                Rating = book.Rating,

            };

            _context.Review.Add(newbook);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Review books)
        {
            var existingBook = await _context.Review.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.BookId = books.BookId;
            existingBook.UserName = books.UserName;
            existingBook.Comment = books.Comment;
            existingBook.Rating = books.Rating;

            _context.SaveChanges();

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingBook = await _context.Review.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Review.Remove(existingBook);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}