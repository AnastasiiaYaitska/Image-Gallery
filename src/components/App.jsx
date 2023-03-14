import { Component } from 'react';
import PropTypes from 'prop-types';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchApi } from './API/Fetch';

export class App extends Component {
  state = {
    keyWord: '',
    images: [],
    page: 1,
    status: 'idle',
    error: null,
    isLastPageReached: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, keyWord } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      this.setState({ status: 'pending' });
      this.getImages(keyWord, page);
    }
  }

  getImages = async (query, page) => {
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchApi(query, page);

      if (hits.length === 0) {
        this.setState({
          status: 'no matches',
        });
        return;
      }
      const totalPages = (totalHits / 12 + 1).toFixed();
      if (+totalPages === page) {
        this.setState({ isLastPageReached: true });
        console.log('hello');
      }
      console.log(totalPages);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  handlerFormSubmit = keyWord => {
    this.setState({
      keyWord,
      page: 1,
      images: [],
      error: null,
      status: 'idle',
    });
  };

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { keyWord, images, status, isLastPageReached } = this.state;
    const isButtonShown = isLastPageReached || images.length === 0;
    return (
      <Container>
        <SearchBar onSubmit={this.handlerFormSubmit} />
        <ImageGallery keyWord={keyWord} images={images} status={status} />
        {!isButtonShown && <Button onClick={this.changePage} />}
        <GlobalStyle />
      </Container>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
ImageGallery.propTypes = {
  keyWord: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
