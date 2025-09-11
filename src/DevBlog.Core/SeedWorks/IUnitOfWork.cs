using DevBlog.Core.Repositories;

namespace DevBlog.Core.SeedWorks
{
    public interface IUnitOfWork
    {
        IPostRepository Posts { get; }

        IPostCategoryRepository PostCategories { get; }

        Task<int> CompleteAsync();
    }
}
