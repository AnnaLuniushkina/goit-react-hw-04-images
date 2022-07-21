import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../serviсes/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Modal} from './Modal/Modal';
import { Circles } from 'react-loader-spinner';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
  if (!searchQuery) {
    return;
    };
    
    const getHits = () => {
      setStatus('pending');
      API(searchQuery, page)
        .then(dataResponse)
        .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    };
    getHits();
  }, [page, searchQuery]);

  const dataResponse = response => {
    const { hits: dataArray, totalHits } = response.data;

    if (!dataArray.length) {
      setStatus('rejected');
      setError(new Error('Спробуйте змінити запит'));
      return;
    }

    const newHits = dataArray.map(hits => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
      } = hits;
      return { id, largeImageURL, webformatURL, tags };
    });

    setHits(hits => [...hits, ...newHits]);
    setTotal(totalHits);
    setStatus('resolved');
  };

  const handleFormSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setPage(1);
      setHits([]);
    }
    return;
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const clickImage = largeImageURL => {
    setImageId(largeImageURL);
    toggleModal();
  };
  
  return (
    <div className='App'>
      <ToastContainer autoClose={3000} />
      
      <Searchbar onSubmit={handleFormSubmit} />
      
      {error && <p className='Error'>Виникла помилка, перезагрузіть сторінку та введіть пошуковий запит</p>}

      <ImageGallery hits={hits} onClick={clickImage}/>

      {status === 'resolved' && hits.length > 0 && hits.length < total && (<Button onClick={loadMore} />)}
      
      {status === 'pending' && (<div className='Circles'>
        <Circles color="#3f51b5" height={80} width={80} ariaLabel="loading-indicator" />
      </div>)}

      {showModal && (<Modal onClose={toggleModal}>
      <img src={imageId} alt="" /></Modal>)}
  </div>
  );
}