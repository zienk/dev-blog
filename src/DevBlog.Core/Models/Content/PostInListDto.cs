using AutoMapper;
using DevBlog.Core.Entities.Blog;

namespace DevBlog.Core.Models.Content
{
    public class PostInListDto
    { 
        public Guid Id { get; set; }      
        public required string Name { get; set; }       
        public required string Slug { get; set; }      
        public string? Description { get; set; }         
        public string? Thumbnail { get; set; }
        public int ViewCount { get; set; }
        public DateTime DateCreated { get; set; }

    }

    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Post, PostInListDto>();
        }
    }

}
