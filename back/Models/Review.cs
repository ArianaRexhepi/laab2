using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.Models
{
    public class Review
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string BookId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public int Rating { get; set; }
    }
}



