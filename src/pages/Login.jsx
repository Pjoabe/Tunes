import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

class Login extends Component {
  // lembrei de tirar o contructor e o super; dica do braddock
  state = {
    name: '',
    disabled: true,
    loading: false,
  };

  validateInput = () => {
    const { name } = this.state;
    const magicNumber = 3;
    const biggerThan = name.length >= magicNumber;
    if (biggerThan) {
      this.setState(({ disabled: false }));
    } else {
      this.setState(({ disabled: true }));
    }
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState(({
      [name]: value,
    }), () => this.validateInput());
  };

  render() {
    const { name, disabled, loading } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            disabled={ disabled }
            data-testid="login-submit-button"
            onClick={ async () => {
              this.setState(({ loading: true }));
              await createUser({ name });
              history.push('/search');
            } }
          >
            {loading && <Loading />}
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
