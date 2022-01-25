using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.Books
{
    public class AuthorLookupDTO : EntityDto<Guid>
    {
        public string Name { get; set; }
    }
}
