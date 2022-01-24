import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './components/authors/author.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthorComponent],
  imports: [SharedModule, AuthorRoutingModule, NgbDatepickerModule],
})
export class AuthorModule {}
