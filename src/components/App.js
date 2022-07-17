import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../serviсes/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Modal} from './Modal/Modal';
import { Circles } from 'react-loader-spinner';


class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    page: 1,
    error: null,
    total: 0,
    status: 'idle',
    showModal: false,
    imageId: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: 'pending', hits: [], page: 1 }, this.getHits);
      console.log('Fetch data');
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ status: 'pending' }, this.getHits);
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery !== searchQuery) {
      this.setState({ searchQuery: searchQuery });
    }
    return;
  };

  getHits = () => {
    API(this.state.searchQuery, this.state.page).then(this.dataResponse).catch(error => this.setState({ error, status: 'rejected' }));
  };

  dataResponse = response => {
    const { hits: dataArray, totalHits } = response.data;

    if (!dataArray.length) {
      this.setState({
        status: 'rejected',
        error: new Error('Спробуйте змінити запит'),
      });
      return;
    }

    const newHits = dataArray.map(hits => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
      } = hits;
      return { id, largeImageURL, webformatURL, tags }
    });

    return this.setState(({ hits }) => {
      return {
        hits: [...hits, ...newHits],
        total: totalHits,
        status: 'resolved',
      };
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  clickImage = id => {
    this.setState({ imageId: id });
    this.toggleModal();
  }

  getLargeImage = () => {
    return this.state.hits.find(img => img.id === this.state.imageId);
  }

  render() {
    const { hits, error, status, total, showModal } = this.state;
    
  return (
    <div className='App'>
      <ToastContainer autoClose={3000} />
      
      <Searchbar onSubmit={this.handleFormSubmit} />
      
      {error && <p className='Error'>Виникла помилка, перезагрузіть сторінку та введіть пошуковий запит</p>}

      <ImageGallery hits={hits} onClick={this.clickImage}/>

      {status === 'resolved' && hits.length > 0 && hits.length < total && (<Button onClick={this.loadMore} />)}
      
      {status === 'pending' && (<div className='Circles'>
        <Circles color="#3f51b5" height={80} width={80} ariaLabel="loading-indicator" />
      </div>)}

      {showModal && (<Modal onClose={this.toggleModal}>
      <img src={this.getLargeImage().largeImageURL} alt={this.getLargeImage().tags} /></Modal>)}
  </div>
  );
  };
};

export default App;