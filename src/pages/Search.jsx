import React, { Component } from 'react';
import Header from '../Header';

class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search" />
      </>

    );
  }
}

export default Search;
