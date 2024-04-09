using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.Models
{
    public class Author
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Biography { get; set; }
        public ICollection<Book> Books { get; set; }
        public string Genre { get; set; }
        public string Image { get; set; }
    }
}