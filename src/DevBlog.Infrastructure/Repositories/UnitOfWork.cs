using DevBlog.Core.SeedWorks;
using DevBlog.Infrastructure.Data;

namespace DevBlog.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DevBlogContext _context;

        public UnitOfWork(DevBlogContext context)
        {
            _context = context;
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }
        public void Dispose()
        {
            _context.Dispose();
        }

    }
}
