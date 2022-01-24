import type { AuthorDTO, CreateAuthorDTO, GetAuthorListDTO, UpdateAuthorDTO } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  apiName = 'Default';

  create = (input: CreateAuthorDTO) =>
    this.restService.request<any, AuthorDTO>({
      method: 'POST',
      url: '/api/app/author',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/author/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, AuthorDTO>({
      method: 'GET',
      url: `/api/app/author/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetAuthorListDTO) =>
    this.restService.request<any, PagedResultDto<AuthorDTO>>({
      method: 'GET',
      url: '/api/app/author',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: UpdateAuthorDTO) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/author/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
