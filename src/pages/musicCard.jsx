import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    favorite: false,
    loading: false,
  };

  addToFavorite = async () => {
    const { favorite } = this.state;
    const { songs } = this.props;
    if (favorite === true) {
      this.setState({ loading: true });
      await addSong(songs);
      this.setState({ loading: false });
    }
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
