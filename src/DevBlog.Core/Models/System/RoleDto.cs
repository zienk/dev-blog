using AutoMapper;
using DevBlog.Core.Entities.Identity;

namespace DevBlog.Core.Models.System
{
    public class RoleDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string DisplayName { get; set; }

        public class AutoMapperProfile : Profile
        {
            public AutoMapperProfile()
            {
                CreateMap<AppRole, RoleDto>();
            }
        }

    }
}
