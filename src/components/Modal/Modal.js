import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {

    const overlayClose = event => {
        if (event.currentTarget === event.target) {
            onClose();
            
        }
    }

    useEffect(() => {
        const closeEscModal = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', closeEscModal);

        return () => {
            window.removeEventListener('keydown', closeEscModal);
        };
    }, [onClose]);

    return  createPortal(
        <div className={styles.overlay} onClick={overlayClose}>
                <div className={styles.modal}>
                {children}
            </div>
            </div>, modalRoot,
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
}
