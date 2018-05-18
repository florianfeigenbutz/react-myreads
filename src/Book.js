import React, { Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  onShelfChange = (e) => {
    if (this.props.onShelfChange) {
      const selectedValue = e.target.options[e.target.selectedIndex].value;
      this.props.onShelfChange(this.props.book, selectedValue);
    }
  };

  render() {
    const { book } = this.props;
    const coverStyle = {
      width: 128,
      height: 193,
      backgroundImage: 'url("' + book.imageLinks.smallThumbnail + '")',
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={ coverStyle }></div>
          <div className="book-shelf-changer">
            <select
              onChange={ this.onShelfChange }
              defaultValue={ book.shelf || 'none' }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ book.title }</div>
        <div className="book-authors">{ book.authors.join(", ") }</div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func,
};

export default Book;