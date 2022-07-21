import React from "react";
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
    
        return (
            <li className={styles.galleryItem} >
                <img className={styles.imageItem}
                    src={webformatURL}
                    alt={tags}
                    onClick={() => onClick(largeImageURL)} />
            </li>
        );
};

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default ImageGalleryItem;