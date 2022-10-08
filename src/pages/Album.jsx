import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import MusicCard from './musicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    songs: [],
    foundResults: false,
  };

  componentDidMount() {
    this.searchById();
  }

  searchById = async () => {
    const { match: { params: { id } } } = this.props;
    const apiReq = await getMusics(id);
    this.setState(
      () => ({ songs: apiReq,
      }),
      () => {
        this.validateApiResult();
      },
    );
  };

  validateApiResult = () => {
    const { songs } = this.state;
    const biggerThan = songs.length > 0;
    if (biggerThan) {
      this.setState({ foundResults: true });
    } else {
      this.setState({ foundResults: false });
    }
  };

  albumArtistInfo = () => {
    const { songs } = this.state;
    const album = songs[0];
    const render = (
      <div>
        <h3 data-testid="artist-name">{ album.artistName }</h3>
        <h2 data-testid="album-name">{ album.collectionName }</h2>
      </div>
    );
    return render;
  };

  render() {
    const { songs, foundResults } = this.state;
    return (
      <>
        { foundResults
        && songs.filter((_, i) => i >= 1)
          .map((song, index) => <MusicCard songs={ song } key={ index } />)}
        { foundResults
        && this.albumArtistInfo()}

        <Header />
        <div data-testid="page-album" />
      </>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
