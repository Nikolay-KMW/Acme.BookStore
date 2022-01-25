using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.Books
{
    public interface IBookAppService : ICrudAppService<BookDTO, Guid, PagedAndSortedResultRequestDto, CreateUpdateBookDTO>
    {
        Task<ListResultDto<AuthorLookupDTO>> GetAuthorLookupAsync();
    }
}
