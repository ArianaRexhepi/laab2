namespace back.Models
{
    public class Review
{
    [Required]
    public Guid Id { get; set; }
    [Required]
    public int BookId { get; set; }
    [Required]
    public string UserName { get; set; }
    [Required]
    public string Content { get; set; }
    [Required]
    public int Rating { get; set; }
}

}