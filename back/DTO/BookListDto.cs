using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using back.Models.Enums;

namespace back.DTO
{
    public class BookListDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Rating { get; set; }
        public DateTime Year { get; set; }
        public string Image { get; set; }
        public int Price { get; set; }
        public string AuthorName { get; set; }
        public BookType Type {get; set;} 
    }
}