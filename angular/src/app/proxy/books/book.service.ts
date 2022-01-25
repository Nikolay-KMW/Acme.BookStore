import type { AuthorLookupDTO, BookDTO, CreateUpdateBookDTO } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiName = 'Default';

  create = (input: CreateUpdateBookDTO) =>
    this.restService.request<any, BookDTO>({
      method: 'POST',
      url: '/api/app/book',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/book/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, BookDTO>({
      method: 'GET',
      url: `/api/app/book/${id}`,
    },
    { apiName: this.apiName });

  getAuthorLookup = () =>
    this.restService.request<any, ListResultDto<AuthorLookupDTO>>({
      method: 'GET',
      url: '/api/app/book/author-lookup',
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<BookDTO>>({
      method: 'GET',
      url: '/api/app/book',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateBookDTO) =>
    this.restService.request<any, BookDTO>({
      method: 'PUT',
      url: `/api/app/book/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
