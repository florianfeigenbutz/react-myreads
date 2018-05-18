import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          { this.props.books
            .filter((book) => { return book.shelf === this.props.shelf })
            .map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            )) }
        </ol>
      </div>
    );
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string,
};

export default BookShelf;