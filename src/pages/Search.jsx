import React, { Component } from 'react';
import Header from '../Header';

class Search extends Component {
  state = {
    name: '',
    disabled: true,
  };

  validateButton = () => {
    const { name } = this.state;
    const magicNumber = 2;
    const biggerThan = name.length >= magicNumber;
    if (biggerThan) {
      this.setState({ disabled: false });
    } else {
      this.setState(({ disabled: true }));
    }
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState(({
      [name]: value,
    }), () => this.validateButton());
  };

  render() {
    const { name, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchInput">
            <input
              data-testid="search-artist-input"
              type="text"
              name="name"
              id="seachInput"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            disabled={ disabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
