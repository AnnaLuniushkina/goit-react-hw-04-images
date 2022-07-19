import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default function Searchbar({onSubmit}) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleNameChange = (event) => {
    setSearchQuery(event.currentTarget.value);
    };

    const handleSubmit = event => {
    event.preventDefault();

    const normalizeSearchQuery = searchQuery.trim().toLowerCase();

    if (normalizeSearchQuery === '') {
        return toast.error('Введіть пошуковий запит.', {theme: 'colored',});
    }

    onSubmit(searchQuery);

    setSearchQuery('');
    }

    return (
<header className={styles.searchbar}>
    <form className={styles.form} onSubmit={handleSubmit}>
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
        value={searchQuery}
        onChange={handleNameChange}
    />
    </form>
</header>
        );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};