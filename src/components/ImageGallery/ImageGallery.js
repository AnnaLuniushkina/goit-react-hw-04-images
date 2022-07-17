import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ hits, onClick }) => {
    const imageClick = event => {
        if (event.target.nodeName !== 'IMG') {
            return;
        }
        
        onClick(Number(event.target.dataset.id));
    }

    return (
        <ul className={styles.gallery} onClick={imageClick}>
                <ImageGalleryItem hits={hits} />
        </ul>
    );
};

ImageGallery.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object.isRequired),
}

export default ImageGallery;