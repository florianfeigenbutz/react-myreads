import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books });
      })
  };

  onShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((booksByShelves) => {
        const booksAndShelves = Object.keys(booksByShelves).reduce((obj, shelf) => {
          booksByShelves[shelf].map((bookId) => {
            obj[bookId] = shelf;
            return obj;
          });
          return obj;
        }, {});

        this.setState((previousState) => {
          return {
            books: previousState.books.reduce((books, book) => {
              book.shelf = booksAndShelves[book.id];
              books.push(book);
              return books;
            }, [])
          }
        });
      });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookShelf
                books={ this.state.books }
                shelf="currentlyReading"
                onShelfChange={ this.onShelfChange } />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookShelf
                books={ this.state.books }
                shelf="wantToRead"
                onShelfChange={ this.onShelfChange } />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookShelf
                books={ this.state.books }
                shelf="read"
                onShelfChange={ this.onShelfChange } />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;