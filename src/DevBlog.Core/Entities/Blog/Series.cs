using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevBlog.Core.Entities.Blog
{
    [Table("Series")]
    [Index(nameof(Slug), IsUnique = true)]
    public class Series
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(250)]
        public required string Name { get; set; }

        [Column(TypeName = "varchar(250)")]
        public required string Slug { get; set; }
        
        [MaxLength(250)]
        public string? Description { get; set; }
        
        [MaxLength(160)]
        public string? SeoDescription { get; set; }
        
        [MaxLength(500)]
        public string? Thumbnail { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Content { get; set; }
        public Guid AuthorId { get; set; }
        public DateTime DateCreated { get; set; }

        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
    }
}
