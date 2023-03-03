import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { fetchApi } from "./API/Fetch";




export class App extends Component { 

  state = {
    keyWord: '',
    page: 1,
    lastLoadedImg : [],

   
    isOpenModal: false
}


  handlerFormSubmit = (keyWord) => {

     this.setState({keyWord})
  };
  
  handlerLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    const {keyWord, page } = this.state;
    fetchApi(keyWord, page).then(images => this.setState({ lastLoadedImg: images.hits }))
      .catch(error => console.log(error));
    
   };
  
  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handlerFormSubmit} />
        <ImageGallery
          keyWord={this.state.keyWord}
          page={this.state.page}
          lastLoadedImg={this.state.lastLoadedImg } />
        <Button onClick={ this.handlerLoadMore} />
        <Loader/>
        <GlobalStyle/>
      </div>
    )
  }
};

