using AutoMapper;
using DevBlog.Core.Repositories;
using DevBlog.Core.SeedWorks;
using DevBlog.Infrastructure.Data;
using DevBlog.Infrastructure.Repositories;

namespace DevBlog.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DevBlogContext _context;  

        public UnitOfWork(DevBlogContext context, IMapper mapper)
        {
            _context = context;
            Posts = new PostRepository(_context, mapper);
            PostCategories = new PostCategoryRepository(_context, mapper);
        }

        public IPostRepository Posts { get; private set; }

        public IPostCategoryRepository PostCategories { get; private set; }

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
