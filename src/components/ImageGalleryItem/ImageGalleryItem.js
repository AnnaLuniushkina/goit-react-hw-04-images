import React from "react";
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ hits}) => {
    return hits.map(({ id, webformatURL, tags }) => {
        return (
            <li className={styles.galleryItem} key={id}>
                <img className={styles.imageItem} src={webformatURL} alt={tags} data-id={id} />
            </li>
        );
    });
};

ImageGalleryItem.propTypes = {
    hits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    )
}

export default ImageGalleryItem;