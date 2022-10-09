import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    favorite: false,
    loading: false,
  };

  componentDidMount() {
    this.getFavorites();
  }

  addToFavorite = async () => {
    const { favorite } = this.state;
    const { songs } = this.props;
    if (favorite === true) {
      this.setState({ loading: true });
      await addSong(songs);
      this.setState({ loading: false });
    }
  };

  getFavorites = async () => {
    const { songs: { trackId } } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      favorite: favorites.find((favorite) => favorite.trackId === trackId),
    });
  };

  render() {
    const { songs: { trackName, previewUrl, trackId } } = this.props;
    const { favorite, loading } = this.state;
    return (
      <div>
        {(loading && <Loading />) || (
          <>
            <span>{trackName}</span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <form>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  id={ trackId }
                  checked={ favorite }
                  onChange={ ({ target: { checked } }) => this.setState({
                    favorite: checked,
                  }, this.addToFavorite) }
                />
              </label>
            </form>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
