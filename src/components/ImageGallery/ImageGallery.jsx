import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import { fetchApi } from "components/API/Fetch";

export class ImageGallery extends Component { 

    state = {
        images: [],
        
    };


    componentDidMount() { 
       
      
    };

    componentDidUpdate(prevProps, prevState) {
        const { keyWord, page } = this.props;
       
        if (prevProps.keyWord !== keyWord) { 
            
              fetchApi(keyWord,page).then(images=>this.setState({images : images.hits}))
            .catch(error => console.log(error))
        };

        
    };

    render() {
        return (
        <ul className="gallery">
                <ImageGalleryItem images={ this.state.images} />
        </ul>
    )
   }
};