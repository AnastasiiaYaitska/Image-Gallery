import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import { Component } from "react";
import { fetchApi } from "components/API/Fetch";
import { Button } from "components/Button/Button";

export class ImageGallery extends Component { 

    state = {
        images: [],
        page: 1,
        lastLoadedImg : []
        
    };


    componentDidMount() { 
       
      
    };

    componentDidUpdate(prevProps, prevState) {
        const { keyWord, page } = this.props;
       
        if (prevProps.keyWord !== keyWord) { 
            
            fetchApi(keyWord, page).then(images => this.setState({ images: images.hits }))
                .catch(error => console.log(error));
            
            this.resetPage();
        };

        
    };

     handlerLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    const {keyWord, page } = this.props;
    fetchApi(keyWord, page).then(images => this.setState({ lastLoadedImg: images.hits }))
      .catch(error => console.log(error));
    
     };

    handlerAddImages = () => { 
        const newImages = this.state.lastLoadedImg;
        this.setState(prevState=>{})
    };
    
    resetPage = () => {
        this.prevState({page:1})
     };

    render() {
        return (
            <>
        <ul className="gallery">
                <ImageGalleryItem images={ this.state.images} />
        </ul>
        <Button onClick = {this.handlerLoadMore} />    
            </>
    )
   }
};


ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,

    }),).isRequired,
};

Button.propTypes = {
    onClick:PropTypes.func.isRequired,
};
