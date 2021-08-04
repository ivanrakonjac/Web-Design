import { Injectable } from '@angular/core';
import { Book } from '../data/book';
import { allBooks } from '../data/booksData';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  getAllBooks(): Book[]{
    return allBooks;
  }

  searchBook(s: string): Book{
    return allBooks.find(book=>book.name.includes(s));
  }

}
