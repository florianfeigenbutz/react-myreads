import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component {
  render() {
    const books = this.props.books
      .filter((book) => { return !this.props.shelf || book.shelf === this.props.shelf });

    return (
      <div className="bookshelf-books">
        {books.length > 0 &&
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                onShelfChange={this.props.onShelfChange}
              />
            </li>
          ))}
        </ol>
        }
        { books.length === 0 &&
          <p>This shelf is currently empty.</p>
        }
      </div>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string,
  onShelfChange: PropTypes.func,
};

export default ListBooks;