import { GalleryItem, GalleryItemImg } from "./ImageGalleryItem.styled";
import { Modal } from "components/Modal/Modal";
import { Component } from "react";



export class ImageGalleryItem extends Component{

    state = {
        showModal: false,
        largeImg: ''
    };


    toggleModal = () => {
           console.log('click ')
           this.setState(prevState=>({showModal: !prevState.showModal}))
    };

    getLargeUrl = (url) => { 
        this.toggleModal();
        this.setState({largeImg: url})
    };
    
    render() {
        const { images } = this.props;
        const { largeImg, showModal } = this.state;
        return (
            <>
             {images.map(({ webformatURL, id, tags, largeImageURL }) => (
                 <GalleryItem key={id}
                     onClick={() => { this.getLargeUrl(largeImageURL) }}>
                         <GalleryItemImg
                         src={webformatURL}
                         alt={tags}
                         />
                {showModal &&
                    <Modal closeModal={this.toggleModal} isOpen={this.state.showModal} >
                    {
                  <img src={largeImg} width="800" height="600" alt=''></img>
                    }
                     </Modal>}
             </GalleryItem>))
       }
            </>
        )
    }
}
