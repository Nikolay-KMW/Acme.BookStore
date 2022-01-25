using Acme.BookStore.Authors;
using Acme.BookStore.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.Books
{
    [Authorize(BookStorePermissions.Books.Default)]
    public class BookAppService : CrudAppService<Book, BookDTO, Guid, PagedAndSortedResultRequestDto, CreateUpdateBookDTO>, IBookAppService
    {
        private readonly IAuthorRepository _authorRepository;

        public BookAppService(IRepository<Book, Guid> rpository, IAuthorRepository authorRepository) : base(rpository)
        {
            _authorRepository = authorRepository;

            GetPolicyName = BookStorePermissions.Books.Default;
            GetListPolicyName = BookStorePermissions.Books.Default;
            CreatePolicyName = BookStorePermissions.Books.Create;
            UpdatePolicyName = BookStorePermissions.Books.Edit;
            DeletePolicyName = BookStorePermissions.Books.Delete;
        }

        public override async Task<BookDTO> GetAsync(Guid id)
        {
            //Get the IQueryable<Book> from the repository
            var queryableBooks = await Repository.GetQueryableAsync();
            var queryableAuthors = await _authorRepository.GetQueryableAsync();

            //Prepare a query to join books and authors
            var query = from book in queryableBooks
                        join author in queryableAuthors on book.AuthorId equals author.Id
                        where book.Id == id
                        select new { book, author };

            //Execute the query and get the book with author
            var queryResult = await AsyncExecuter.FirstOrDefaultAsync(query);
            if (queryResult == null)
            {
                throw new EntityNotFoundException(typeof(Book), id);
            }

            var bookDTO = ObjectMapper.Map<Book, BookDTO>(queryResult.book);
            bookDTO.AuthorName = queryResult.author.Name;
            return bookDTO;
        }

        public override async Task<PagedResultDto<BookDTO>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            await CheckGetListPolicyAsync();

            //Get the IQueryable<Book> from the repository
            var queryableBooks = await Repository.GetQueryableAsync();
            var queryableAuthors = await _authorRepository.GetQueryableAsync();

            //Prepare a query to join books and authors
            var query = from book in queryableBooks
                        join author in queryableAuthors on book.AuthorId equals author.Id
                        select new { book, author };

            query = query
                .OrderBy(NormalizeSorting(input.Sorting))
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount);

            //Execute the query and get a list
            var queryResult = await AsyncExecuter.ToListAsync(query);

            //Convert the query result to a list of BookDto objects
            var bookDtos = queryResult.Select(x =>
            {
                var bookDTO = ObjectMapper.Map<Book, BookDTO>(x.book);
                bookDTO.AuthorName = x.author.Name;
                return bookDTO;
            }).ToList();

            //Get the total count with another query
            var totalCount = await Repository.GetCountAsync();

            return new PagedResultDto<BookDTO>(
                totalCount,
                bookDtos
            );
        }

        public async Task<ListResultDto<AuthorLookupDTO>> GetAuthorLookupAsync()
        {
            var authors = await _authorRepository.GetListAsync();

            return new ListResultDto<AuthorLookupDTO>(
                ObjectMapper.Map<List<Author>, List<AuthorLookupDTO>>(authors)
            );
        }

        private static string NormalizeSorting(string sorting)
        {
            if (sorting.IsNullOrEmpty())
            {
                return $"book.{nameof(Book.Name)}";
            }

            if (sorting.Contains("authorName", StringComparison.OrdinalIgnoreCase))
            {
                return sorting.Replace(
                    "authorName",
                    "author.Name",
                    StringComparison.OrdinalIgnoreCase
                );
            }

            return $"book.{sorting}";
        }
    }
}
