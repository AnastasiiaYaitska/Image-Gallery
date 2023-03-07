import PropTypes from 'prop-types';
import { ColorRing } from  'react-loader-spinner'
import { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { fetchApi } from "components/API/Fetch";
import { Button } from "components/Button/Button";
import { Gallery } from "./ImageGallery.styled";

export class ImageGallery extends Component { 

    state = {
        images: [],
        page: 1,
        status: 'idle'
        // lastLoadedImg : []
        
    };


    componentDidUpdate(prevProps, prevState) {
        const { keyWord} = this.props;
        const { page } = this.state;

        if (prevProps.keyWord !== keyWord || prevState.page !== page) { 
            if (prevProps.keyWord !== keyWord) {
                this.resetPage();
                this.resetImages();
            }
            
            fetchApi(keyWord, page).then(images => this.setState(prevState=>({images: [...prevState.images, ...images.hits]})))
                .catch(error => console.log(error));
            
        };
        
    };

     handlerLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));       
    };

    // handlerAddImages = () => { 
    //     const newImages = this.state.lastLoadedImg;
    //     this.setState(prevState=>({images:[...prevState.images, ...newImages]}))
    // };
    
    resetPage = () => {
        this.setState({page:1})
    };

    resetImages = () => {
        this.setState({images:[]})
    };

    render() {
        return (
            <>
        <Gallery >
               {this.state.images === [] && <ColorRing />}
                <ImageGalleryItem images={ this.state.images} />
        </Gallery>
        <Button onClick = {this.handlerLoadMore} />    
            </>
    )
   }
};


ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        tag: PropTypes.string,

    }),).isRequired,
};

Button.propTypes = {
    onClick:PropTypes.func.isRequired,
};
