import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Loading';

class Search extends Component {
  state = {
    name: '',
    disabled: true,
    loading: false,
    apiData: [],
    foundResults: false,
  };

  componentDidMount() {
    this.searchByName();
  }

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

  searchByName = async () => {
    const { name } = this.state;
    const apiReq = await searchAlbumsAPI(name);
    this.setState(
      () => ({ apiData: apiReq }),
      () => {
        this.validateApiResult();
      },
    );
  };

  validateApiResult = () => {
    const { apiData } = this.state;
    const biggerThan = apiData.length > 0;
    if (biggerThan) {
      this.setState({ foundResults: true });
    } else {
      this.setState({ foundResults: false });
    }
  };

  renderApiData = () => {
    const { apiData, requiredData } = this.state;
    const albums = (
      <>
        <h4>
          Resultado de álbuns de:
          {/* https://techstacker.com/how-to-add-white-space-between-elements-react-jsx/ */}
          {' '}
          {requiredData}
        </h4>
        {apiData.map(({ artworkUrl100, collectionName, collectionId, artistName }) => (
          <div key={ collectionId }>
            <img
              src={ artworkUrl100 }
              alt={ collectionName }
            />
            <span>{collectionName}</span>
            <span>{artistName}</span>
            <NavLink
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              Ir Para
            </NavLink>
          </div>))}
      </>);
    return albums;
  };

  render() {
    const { name, disabled, loading, foundResults } = this.state;
    return (
      <div data-testid="page-search">
        {loading && <Loading /> && this.renderApiData()}
        {foundResults || <span>Nenhum álbum foi encontrado</span>}
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
            onClick={ () => {
              this.setState(() => ({
                name: '',
                requiredData: name,
                loading: true,
              }));
              this.searchByName();
            } }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
