import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
    static defaultProps = {onSubmit: null};

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    
    state = {
        searchQuery: '',
    };

    handleNameChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const normalizeSearchQuery = this.state.searchQuery.trim().toLowerCase();

        if (normalizeSearchQuery === '') {
            return toast.error('Введіть пошуковий запит.', {theme: 'colored',});
        }

        this.props.onSubmit(this.state.searchQuery);

        this.setState({ searchQuery: '' });
    }
    
    render() {

        return (
<header className={styles.searchbar}>
    <form className={styles.form} onSubmit={this.handleSubmit}>
    <button type="submit" className={styles.button}>
        <span className={styles.buttonLabel}>Search</span>
    </button>

    <input
        className={styles.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name='searchQuery'
        value={this.state.searchQuery}
        onChange={this.handleNameChange}
    />
    </form>
</header>
        );
    };
};

export default Searchbar;