using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Rating { get; set; }
        public DateTime Year { get; set; }
        public string Image { get; set; }
        public int Price { get; set; }
    }
}