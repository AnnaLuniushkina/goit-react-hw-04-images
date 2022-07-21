import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ hits, onClick }) => {

    return (
        <ul className={styles.gallery} >
            {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    tags={tags}
                    largeImageURL={largeImageURL}
                    onClick={onClick} />
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object.isRequired),
    onClick: PropTypes.func.isRequired,
}

export default ImageGallery;