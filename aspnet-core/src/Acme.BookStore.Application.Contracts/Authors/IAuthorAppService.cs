using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.Authors
{
    public interface IAuthorAppService: IApplicationService
    {
        Task<AuthorDTO> GetAsync(Guid id);
        Task<PagedResultDto<AuthorDTO>> GetListAsync(GetAuthorListDTO input);
        Task<AuthorDTO> CreateAsync(CreateAuthorDTO input);
        Task UpdateAsync(Guid id, UpdateAuthorDTO input);
        Task DeleteAsync(Guid id);
    }
}
