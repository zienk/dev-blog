using AutoMapper;
using DevBlog.Core.Entities.Blog;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevBlog.Core.Models.Content
{
    public class CreateUpdatePostCategoryRequest
    {
        [MaxLength(250)]
        public required string Name { get; set; }

        [Column(TypeName = "varchar(250)")]
        public required string Slug { get; set; }

        public Guid? ParentId { get; set; }

        [MaxLength(160)]
        public string? SeoDescription { get; set; }

        public bool IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public int SortOrder { get; set; }

        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<CreateUpdatePostCategoryRequest, PostCategory>();
            }
        }

    }
}
