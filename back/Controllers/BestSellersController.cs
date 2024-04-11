using back.Data;
using back.DTO;
using back.Models;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BestSellersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BestSellersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.BestSeller.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooksAsync(Guid id)
        {
            var existingBook = await _context.BestSeller.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            return Ok(existingBook);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(BestSellersAddDto book)
        {
            var newbook = new BestSellers
            {
                Id = new Guid(),
                Title = book.Title,
                AuthorName = book.AuthorName,
                Category = book.Category,
                Rating = book.Rating,
                Description = book.Description,
                Image = book.Image,
                Year = book.Year,
                Price = book.Price

            };

            _context.BestSeller.Add(newbook);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, BestSellers books)
        {
            var existingBook = await _context.BestSeller.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = books.Title;
            existingBook.AuthorName = books.AuthorName;
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
            var existingBook = await _context.BestSeller.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.BestSeller.Remove(existingBook);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}