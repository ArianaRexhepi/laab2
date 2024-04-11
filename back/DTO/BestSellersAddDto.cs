using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.DTO
{
    public class BestSellersAddDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string AuthorName { get; set; }
        [Required]
        public string AuthorId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public int Rating { get; set; }
        [Required]
        public DateTime Year { get; set; }
        [Required]
        public string? Image { get; set; }
        [Required]
        public int Price { get; set; }
    }
}