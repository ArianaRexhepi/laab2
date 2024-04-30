using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Models
{
    public class History
    {
        public Guid Id { get; set; }
        // public AppUser User{ get; set; }
        // public Guid UserId {get; set; }
        public ICollection<BookId> BookIds{ get; set; }
        
    }
    public class BookId{
        public Guid Id { get; set;}
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}