import { mapEnumToOptions } from '@abp/ng.core';

export enum BookType {
  Undefined = 0,
  Adventure = 1,
  Biography = 2,
  Dystopia = 3,
  Fantastic = 4,
  Science = 5,
  ScienceFiction = 6,
  Poetry = 7,
}

export const bookTypeOptions = mapEnumToOptions(BookType);
