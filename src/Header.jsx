import React, { Component } from 'react';
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
      <div data-testid="header-component">
        {loading || <Loading />}
        <span data-testid="header-user-name">
          {name}
        </span>
      </div>
    );
  }
}

export default Header;
