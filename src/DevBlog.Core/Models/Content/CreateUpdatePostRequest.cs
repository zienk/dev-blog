using AutoMapper;
using DevBlog.Core.Entities.Blog;

namespace DevBlog.Core.Models.Content
{
    public class CreateUpdatePostRequest
    {
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public string? Description { get; set; }
        public string? Thumbnail { get; set; }
        public Guid CategoryId { get; set; }
        public string? Content { get; set; }
        public string? Source { get; set; }
        public string? Tags { get; set; }
        public string? SeoDescription { get; set; }

    }

    public class CreateUpdatePostMappingProfiles : Profile
    {
        public CreateUpdatePostMappingProfiles()
        {
            CreateMap<CreateUpdatePostRequest, Post>();
        }
    }
}
