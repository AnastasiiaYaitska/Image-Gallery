import { Component } from "react";
import PropTypes from 'prop-types';
import { GlobalStyle } from "./GlobalStyle";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
// import { fetchApi } from "./API/Fetch";




export class App extends Component { 

  state = {
    keyWord: '',
  
  

   
    // isOpenModal: false
}


  handlerFormSubmit = (keyWord) => {

     this.setState({keyWord})
  };
  
 
  
  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handlerFormSubmit} />
        <ImageGallery
          keyWord={this.state.keyWord}
         />
        {/* <Button onClick={ this.handlerLoadMore} /> */}
        <Loader/>
        <GlobalStyle/>
      </div>
    )
  }
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
ImageGallery.propTypes = {
  keyWord: PropTypes.string.isRequired,
}