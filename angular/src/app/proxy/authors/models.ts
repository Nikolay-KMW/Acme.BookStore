import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface AuthorDTO extends EntityDto<string> {
  name?: string;
  birthDate?: string;
  shortBio?: string;
}

export interface CreateAuthorDTO {
  name: string;
  birthDate: string;
  shortBio?: string;
}

export interface GetAuthorListDTO extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface UpdateAuthorDTO {
  name: string;
  birthDate: string;
  shortBio?: string;
}
