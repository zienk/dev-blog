using DevBlog.Core.Entities.Blog;
using DevBlog.Core.Models;
using DevBlog.Core.Models.Content;
using DevBlog.Core.SeedWorks;

namespace DevBlog.Core.Repositories
{
    public interface IPostCategoryRepository : IRepository<PostCategory, Guid>
    {
        Task<PagedResult<PostCategoryDto>> GetAllPaging(string keyword, int pageIndex = 1, int pageSize = 10);
    }
}
