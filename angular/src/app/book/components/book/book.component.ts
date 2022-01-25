import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService, BookDTO, bookTypeOptions, AuthorLookupDTO } from '@proxy/books';
import { NgbDateNativeAdapter, NgbDateAdapter, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class BookComponent implements OnInit {
  @ViewChild('abpModal', { static: false }) abpModal: NgbModalRef;

  book = { items: [], totalCount: 0 } as PagedResultDto<BookDTO>;

  form: FormGroup;
  selectedBook = {} as BookDTO;
  bookTypes = bookTypeOptions;
  isModalOpen = false;

  authors$: Observable<AuthorLookupDTO[]>;

  constructor(
    public readonly list: ListService,
    private bookService: BookService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {
    this.authors$ = bookService.getAuthorLookup().pipe(map(r => r.items));
  }

  ngOnInit() {
    const bookStreamCreator = (query: PagedAndSortedResultRequestDto) =>
      this.bookService.getList(query);

    this.list.hookToQuery(bookStreamCreator).subscribe(response => {
      this.book = response;
    });
  }

  createBook() {
    this.selectedBook = {} as BookDTO;
    this.buildForm();
    this.isModalOpen = true;
  }

  editBook(id: string) {
    this.bookService.get(id).subscribe(book => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedBook.name || '', Validators.required],
      type: [this.selectedBook.type || null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null,
        Validators.required,
      ],
      price: [this.selectedBook.price || null, Validators.required],
      authorId: [this.selectedBook.authorId || null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBook.id
      ? this.bookService.update(this.selectedBook.id, this.form.value)
      : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  close(id: string) {
    this.abpModal.close();

    if (this.abpModal.closed) {
      this.isModalOpen = false;
    }
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.bookService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
