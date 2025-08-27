using DevBlog.Core.Entities.Blog;
using DevBlog.Core.Repositories;
using DevBlog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DevBlog.Infrastructure.Repositories
{
    public class PostRepository : RepositoryBase<Post, Guid>, IPostRepository
    {
        public PostRepository(DevBlogContext context) : base(context)
        {
        }

        public Task<List<Post>> GetPopularPostsAsync(int count)
        {
            return _context.Posts
                .OrderByDescending(p => p.ViewCount)
                .Take(count)
                .ToListAsync();
        }
    }
}
