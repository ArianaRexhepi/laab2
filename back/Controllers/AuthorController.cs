using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Data;
using back.Models;
using back.DTO;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAuthors()
        {
            var authors = await _context.Authors.ToListAsync();   

            return Ok(authors);
        }
        

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthor(Guid id)
        {
            var author = await _context.Authors
                .Include(a => a.Books)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (author == null)
            {
                return NotFound("Author not found!");
            }

            return Ok(author);
        }

        [HttpPost]
        public async Task<IActionResult> AddAuthor(AuthorAddDto authorDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var author = new Author
            {
                Name = authorDto.Name,
                Biography = authorDto.Biography,
                Genre = authorDto.Genre,
                Image = authorDto.Image
            };

            _context.Authors.Add(author);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuthor), new { id = author.Id }, author);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Author authors)
        {
            var existingAuthor = await _context.Authors.FindAsync(id);
            if (existingAuthor == null)
            {
                return NotFound();
            }

            existingAuthor.Name = authors.Name;
            existingAuthor.Genre = authors.Genre;
            existingAuthor.Biography = authors.Biography;
            existingAuthor.Image = authors.Image;


            _context.SaveChanges();

            return Ok();
        }
        // [HttpPost("{authorId}/books")]
        // public async Task<IActionResult> AddBookForAuthor(Guid authorId, [FromBody] BookAddDto bookDto)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }

        //     var author = await _context.Authors.FirstOrDefaultAsync(a => a.Id == authorId);
        //     if (author == null)
        //     {
        //         return NotFound("Author not found!");
        //     }

        //     var book = new Book
        //     {
        //         Title = bookDto.Title,
        //         Author = author,
        //         Description = bookDto.Description,
        //         Category = bookDto.Category,
        //         Rating = bookDto.Rating,
        //         Year = bookDto.Year,
        //         Image = bookDto.Image,
        //         Price = bookDto.Price
        //     };

        //     author.Books.Add(book);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction("GetBook", "Book", new { id = book.Id }, book);
        // }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(Guid id)
        {
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound("Author not found!");
            }

            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
