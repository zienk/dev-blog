﻿using AutoMapper;
using DevBlog.Core.Entities.Blog;

namespace DevBlog.Core.Models.Content
{
    public class PostCategoryDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public Guid? ParentId { get; set; }
        public string? SeoDescription { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public int SortOrder { get; set; }
        public class AutoMapperProfiles : Profile
        {
            public AutoMapperProfiles()
            {
                CreateMap<PostCategory, PostCategoryDto>();
            }
        }

    }
}
