import type { AuditedEntityDto } from '@abp/ng.core';
import type { BookType } from './book-type.enum';

export interface BookDTO extends AuditedEntityDto<string> {
  name?: string;
  type: BookType;
  publishDate?: string;
  price: number;
}

export interface CreateUpdateBookDTO {
  name: string;
  type: BookType;
  publishDate: string;
  price: number;
}
