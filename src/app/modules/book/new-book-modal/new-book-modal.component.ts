import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookDto } from '../models/bookDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-book-modal',
  templateUrl: './new-book-modal.component.html',
  styleUrl: './new-book-modal.component.scss'
})
export class NewBookModalComponent {
  bookForm!: FormGroup
  formErrors: any = []
  @Input() bookToBeUpdated: BookDto | undefined

  constructor(private booksService: BooksService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal) { }

  iniForm() {
    this.bookForm = this.formBuilder.group({
      id: [this.bookToBeUpdated?.id ?? 0, Validators.required],
      title: [this.bookToBeUpdated?.title ?? null, Validators.required],
      author: [this.bookToBeUpdated?.author ?? null, Validators.required],
      genre: [this.bookToBeUpdated?.genre ?? null, Validators.required],
      publishedYear: [this.bookToBeUpdated?.publishedYear ?? null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.iniForm()
  }

  validateNumber(event: any): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  close() {
    this.activeModal.close()
  }

  createOrUpdateBook() {
    if (this.bookForm.valid) {
      if (this.bookForm.controls["id"].value == 0) {
        this.booksService.AddNewBook(this.bookForm.value).subscribe(result => {
          if (result) {
            this.activeModal.close(true)
            Swal.fire({
              icon: 'success',
              title: 'BlueRits',
              text: "Success",
              timer: 15000,
              timerProgressBar: true,
              confirmButtonText: "Ok"
            })
          }
        })
      }
      else {
        this.booksService.UpdateBook(this.bookForm.controls["id"].value, this.bookForm.value).subscribe(result => {
          if (result) {
            this.activeModal.close(true)
            Swal.fire({
              icon: 'success',
              title: 'BlueRits',
              text: "Success",
              timer: 15000,
              timerProgressBar: true,
              confirmButtonText: "Ok"
            })
          }
        })
      }
    }
    else
      this.logValidationErrors()
  }

  logValidationErrors(form: FormGroup = this.bookForm): void {
    Object.keys(form.controls).forEach((key: string) => {
      const abstractControl = form.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      else {
        if (abstractControl?.errors !== null) {
          switch (true) {
            case abstractControl?.errors.hasOwnProperty('required'):
              this.formErrors[key] = `general.required`;
              break;
            default:
              break;
          }
        }
      }
    });
  }
}
