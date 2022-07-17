import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    static defaultProps = { onClose: null, children: null }
    
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        children: PropTypes.object.isRequired,
    }
    
    componentDidMount() {
        window.addEventListener('keydown', this.closeEscModal);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeEscModal);
    }

    closeEscModal = event => {
        if (event.code === 'Escape') {
                this.props.onClose();
            }
    }

    overlayClose = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
            
        }
    }
    

    render() {
        return  createPortal(
        <div className={styles.overlay} onClick={this.overlayClose}>
                <div className={styles.modal}>
                {this.props.children}
            </div>
            </div>, modalRoot,
    );
    }
}


