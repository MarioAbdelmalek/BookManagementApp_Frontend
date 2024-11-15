import { Component } from '@angular/core';
import { BookDto } from '../models/bookDto';
import { BooksService } from '../services/books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewBookModalComponent } from '../new-book-modal/new-book-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  books: BookDto[] = []

  constructor(private booksService: BooksService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllBooks()
  }

  getAllBooks() {
    this.booksService.GetAllBooks().subscribe(result => this.books = result)
  }

  deleteBook(bookID: number) {
    this.booksService.DeleteBookByID(bookID).subscribe(result => {
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'BlueRits',
          text: "Success",
          timer: 15000,
          timerProgressBar: true,
          confirmButtonText: "Ok"
        })
        this.getAllBooks()
      }
    })
  }

  openBookModal(item: BookDto | undefined) {
    const modalReference = this.modalService.open(NewBookModalComponent, { backdrop: 'static', size: 'lg', centered: true })
    modalReference.componentInstance.bookToBeUpdated = item
    modalReference.closed.subscribe((result: boolean) => {
      if (result == true) {
        this.getAllBooks()
      }
    })
  }
}