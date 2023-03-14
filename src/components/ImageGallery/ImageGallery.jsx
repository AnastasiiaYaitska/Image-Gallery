import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({ keyWord, images, status }) => {
  if (status === 'resolved') {
    return (
      <>
        <Gallery>
          <ImageGalleryItem images={images} />
        </Gallery>
      </>
    );
  }
  if (status === 'pending') {
    return (
      <>
        <Gallery>
          <ImageGalleryItem images={images} />
        </Gallery>
        <Loader />
      </>
    );
  }
  if (status === 'rejected') {
    return <p>Sorry something went wrong</p>;
  }
  if (status === 'no matches') {
    return <p>Incorrect request {keyWord} </p>;
  }
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tag: PropTypes.string,
    })
  ).isRequired,
};
