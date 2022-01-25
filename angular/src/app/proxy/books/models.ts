import type { AuditedEntityDto, EntityDto } from '@abp/ng.core';
import type { BookType } from './book-type.enum';

export interface AuthorLookupDTO extends EntityDto<string> {
  name?: string;
}

export interface BookDTO extends AuditedEntityDto<string> {
  name?: string;
  type: BookType;
  publishDate?: string;
  price: number;
  authorId?: string;
  authorName?: string;
}

export interface CreateUpdateBookDTO {
  name: string;
  type: BookType;
  publishDate: string;
  price: number;
  authorId?: string;
}
