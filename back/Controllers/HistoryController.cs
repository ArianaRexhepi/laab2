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
    public class HistoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistoryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHistoryAsync(Guid id)
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
        public async Task<IActionResult> PostAsync(HistoryAddDto history)
        {
            //qetu e merr autorin edhe ja shtin ose bookit autorin dmth t vyn ni autorId pej frontit

            var history = await _context.Authors.FindAsync(history.UserId);
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
        
    }
}
