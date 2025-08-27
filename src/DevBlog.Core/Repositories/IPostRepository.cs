using DevBlog.Core.Entities.Blog;
using DevBlog.Core.SeedWorks;

namespace DevBlog.Core.Repositories
{
    public interface IPostRepository : IRepository<Post, Guid>
    {
        Task<List<Post>> GetPopularPostsAsync(int count);
    }
}
