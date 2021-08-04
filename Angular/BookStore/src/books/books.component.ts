import { Component, OnInit } from '@angular/core';
import { Book } from '../data/book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.allBooks = this.booksService.getAllBooks();
  }

  allBooks: Book[]

  searchField: string;
  mybook: Book;

  searchBook(){
    this.mybook = this.booksService.searchBook(this.searchField);
  }

}
