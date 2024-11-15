import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDto } from '../models/bookDto';
import { Observable } from 'rxjs';
import { Configuration } from '../../../endPoints';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private httpClient: HttpClient) { }

  GetAllBooks(): Observable<BookDto[]> {
    let response = this.httpClient.get<BookDto[]>(Configuration.APIs.Books.GetAllBooks);
    return response;
  }

  AddNewBook(bookDto: BookDto): Observable<boolean> {
    let response = this.httpClient.post<boolean>(Configuration.APIs.Books.AddNewBook, bookDto);
    return response;
  }

  UpdateBook(id: number, bookDto: BookDto): Observable<boolean> {
    let response = this.httpClient.put<boolean>(Configuration.APIs.Books.UpdateBook + id, bookDto);
    return response;
  }

  DeleteBookByID(id: number): Observable<boolean> {
    let response = this.httpClient.delete<boolean>(Configuration.APIs.Books.DeleteBookByID + id);
    return response;
  }
}
