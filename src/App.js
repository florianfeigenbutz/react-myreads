import React from 'react'
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {

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
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onShelfChange={this.onShelfChange}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            onShelfChange={this.onShelfChange}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
