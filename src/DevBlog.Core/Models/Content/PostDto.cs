using AutoMapper;
using DevBlog.Core.Entities.Blog;

namespace DevBlog.Core.Models.Content
{
    public class PostDto : PostInListDto
    {
        public Guid CategoryId { get; set; }
        public string? Content { get; set; }
        public Guid AuthorId { get; set; }
        public string? Source { get; set; }
        public string? Tags { get; set; }
        public string? SeoDescription { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsPaid { get; set; }
        public decimal RoyaltyAmount { get; set; }
        public PostStatus Status { get; set; }
    }
    public class PostMappingProfile : Profile
    {
        public PostMappingProfile()
        {
            CreateMap<Post, PostDto>();
        }
    }
}
