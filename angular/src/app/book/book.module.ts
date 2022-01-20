import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; 

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './components/book/book.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    SharedModule,
    BookRoutingModule,
    NgbDatepickerModule
  ]
})
export class BookModule { }
