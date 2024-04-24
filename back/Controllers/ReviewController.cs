using back.Data;
using back.DTO;
using back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var reviews = await _context.Reviews.ToListAsync();
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewAsync(Guid id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(ReviewDto reviewDto)
        {
            var newReview = new Review
            {
                Id = Guid.NewGuid(),
                BookId = reviewDto.BookId,
                UserName = reviewDto.UserName,
                Comment = reviewDto.Comment,
                Rating = reviewDto.Rating
            };

            _context.Reviews.Add(newReview);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, ReviewDto reviewDto)
        {
            var existingReview = await _context.Reviews.FindAsync(id);
            if (existingReview == null)
            {
                return NotFound();
            }

            existingReview.BookId = reviewDto.BookId;
            existingReview.UserName = reviewDto.UserName;
            existingReview.Comment = reviewDto.Comment;
            existingReview.Rating = reviewDto.Rating;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingReview = await _context.Reviews.FindAsync(id);
            if (existingReview == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(existingReview);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
