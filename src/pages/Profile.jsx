import React, { Component } from 'react';
import Header from '../Header';

class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile" />
      </>
    );
  }
}

export default Profile;
