using back.Data;
using back.DTO;
using back.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MagazinesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MagazinesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Magazine.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooksAsync(Guid id)
        {
            var existingBook = await _context.Magazine.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            return Ok(existingBook);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(MagazinesAddDto book)
        {
            var newbook = new Magazines
            {
                Id = new Guid(),
                Title = book.Title,
                Category = book.Category,
                Rating = book.Rating,
                Description = book.Description,
                Image = book.Image,
                Year = book.Year,
                Price = book.Price

            };

            _context.Magazine.Add(newbook);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Magazines books)
        {
            var existingBook = await _context.Magazine.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = books.Title;
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
            var existingBook = await _context.Magazine.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Magazine.Remove(existingBook);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}