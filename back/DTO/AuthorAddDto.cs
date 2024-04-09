using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.DTO
{
    public class AuthorAddDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Biography { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        public string Image { get; set; }
    }
}