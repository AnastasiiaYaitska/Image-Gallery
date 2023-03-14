import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component {
  state = {
    largeImg: '',
  };

  getLargeUrl = url => {
    this.setState({ largeImg: url });
  };

  removeLargeUrl = () => {
    this.setState({ largeImg: '' });
  };

  render() {
    const { images } = this.props;
    const { largeImg } = this.state;
    return (
      <>
        {images.map(({ webformatURL, id, tags, largeImageURL }) => (
          <GalleryItem
            key={id}
            onClick={() => {
              this.getLargeUrl(largeImageURL);
            }}
          >
            <GalleryItemImg src={webformatURL} alt={tags} />
          </GalleryItem>
        ))}
        {largeImg !== '' && (
          <Modal closeModal={this.removeLargeUrl}>{largeImg}</Modal>
        )}
      </>
    );
  }
}

Modal.protoTypes = {
  largeImg: PropTypes.string.isRequired,
};
GalleryItem.PropTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tag: PropTypes.string,
    })
  ),
};
