import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ hits, onClick }) => {

    return (
        <ul className={styles.gallery} >
            <ImageGalleryItem hits={hits} onClick={onClick} />
        </ul>
    );
};

ImageGallery.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object.isRequired),
}

export default ImageGallery;