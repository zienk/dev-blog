using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevBlog.Core.Entities.Blog
{
    [Table("PostsInSeries")]
    [PrimaryKey(nameof(PostId), nameof(SeriesId))]
    public class PostInSeries
    {
        public Guid PostId { get; set; }
        public Guid SeriesId { get; set; }
        public int SortOrder { get; set; }
    }
}
