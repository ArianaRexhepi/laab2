using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.DTO
{
    public class HistoryAddDto
    {
        [Required]
        public Guid BookId { get; set; }
        [Required]
        public string UserId { get; set; }


    }
}