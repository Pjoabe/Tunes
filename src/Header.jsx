import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// NavLink ao invés de link, para possível estilização (pelo que eu entendi), dica do braddock.
import { getUser } from './services/userAPI';
import Loading from './Loading';

class Header extends Component {
  // sem o constructor/ super; dica do braddock
  state = {
    loading: false,
    name: [],
  };

  componentDidMount() {
    this.handleAPIName();
  }

  handleAPIName = async () => {
    const apiName = await getUser();
    this.setState({ loading: true, name: apiName });
    // console.log(user);
  };

  render() {
    const { loading, name: { name } } = this.state;
    // console.log(name);
    return (
    // NavLink ao invés de link, para possível estilização (pelo que eu entendi), dica do braddock.
      <div data-testid="header-component">
        <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
        {loading || <Loading />}
        <span data-testid="header-user-name">
          {name}
        </span>
      </div>
    );
  }
}

export default Header;
