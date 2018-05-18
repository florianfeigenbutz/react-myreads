import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import LoadingSpinner from './LoadingSpinner';
import ListBooks from './ListBooks';

class ListBookShelves extends Component {

  render() {
    return (
      <div className="list-books">
        {this.props.books === 'loading' &&
          <LoadingSpinner />
        }
        { this.props.books !== 'loading' &&
        <div>
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <ListBooks
                  books={ this.props.books }
                  shelf="currentlyReading"
                  onShelfChange={ this.props.onShelfChange } />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <ListBooks
                  books={ this.props.books }
                  shelf="wantToRead"
                  onShelfChange={ this.props.onShelfChange } />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <ListBooks
                  books={ this.props.books }
                  shelf="read"
                  onShelfChange={ this.props.onShelfChange } />
              </div>
            </div>
          </div>
        </div>
        }
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func,
};

export default ListBookShelves;