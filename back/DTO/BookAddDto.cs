using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using back.Models.Enums;

namespace back.DTO
{
    public class BookAddDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public Guid AuthorId { get; set; }
        [Required]
        public int Type {get; set;}
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