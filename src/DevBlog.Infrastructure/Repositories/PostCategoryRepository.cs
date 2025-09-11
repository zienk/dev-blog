using AutoMapper;
using DevBlog.Core.Entities.Blog;
using DevBlog.Core.Models;
using DevBlog.Core.Models.Content;
using DevBlog.Core.Repositories;
using DevBlog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DevBlog.Infrastructure.Repositories
{
    public class PostCategoryRepository : RepositoryBase<PostCategory, Guid>, IPostCategoryRepository
    {
        private readonly IMapper _mapper;

        public PostCategoryRepository(DevBlogContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<PagedResult<PostCategoryDto>> GetAllPaging(string? keyword, int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.PostCategories.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword));
            }
            var totalRow = await query.CountAsync();

            query = query
                .OrderByDescending(x => x.DateCreated)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize);

            return new PagedResult<PostCategoryDto>
            {
                Results = await _mapper.ProjectTo<PostCategoryDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };
        }

    }
}
