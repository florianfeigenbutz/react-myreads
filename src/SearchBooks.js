import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import BookShelf from './BookShelf';

class SearchBooks extends Component {
  searchTimeout;

  state = {
    searchTerm: '',
    foundBooks: []
  };

  _resetBooks = () => {
    this.setState({ foundBooks: [] });
  };

  onSearchChange = (e) => {
    const searchTerm = e.target.value;

    // only search every 250ms
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.setState({ searchTerm });
      if (searchTerm === '') {
        this._resetBooks();
      } else {
        BooksAPI.search(searchTerm)
          .then((books) => {
            if (books.error) {
              this._resetBooks();
            } else {
              this.setState({
                foundBooks: books.map((foundBook) => {
                  const existingBook = this.props.books.filter((book) => book.id === foundBook.id).shift();
                  if (existingBook && existingBook.shelf) {
                    foundBook.shelf = existingBook.shelf;
                  }
                  return foundBook;
                })
              });
            }
          })
      }
    }, 250);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearchChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          { this.state.searchTerm !== '' && this.state.foundBooks.length > 0 &&
            <BookShelf
              books={this.state.foundBooks}
              onShelfChange={this.props.onShelfChange}/>
          }
          { this.state.searchTerm !== '' && this.state.foundBooks.length === 0 &&
            <p>Could not find any books for the search term: "{this.state.searchTerm}"</p>
          }
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func,
};

export default SearchBooks;