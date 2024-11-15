import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';
import { BooksComponent } from './books/books.component';
import { NewBookModalComponent } from './new-book-modal/new-book-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    BooksComponent,
    NewBookModalComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ]
})
export class BookModule { }