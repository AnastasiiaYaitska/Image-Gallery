import PropTypes from 'prop-types';
// import {toast } from 'react-toastify';
import { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { fetchApi } from "components/API/Fetch";
import { Button } from "components/Button/Button";
import { Gallery } from "./ImageGallery.styled";
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component { 

    state = {
        images: [],
        page: 1,
        totalPage: null,
        status: 'idle'       
    };


    componentDidUpdate(prevProps, prevState) {
        const { keyWord} = this.props;
        const { page } = this.state;

       
       
        if (prevProps.keyWord !== keyWord) {
                 this.setState({ status: 'pending' });
                this.resetPage();
                this.resetImages();
            fetchApi(keyWord, page).then(images => {
                    console.log(images)
                    if (images.hits.length === 0) {
                        console.log('no matches')
                   return  this.setState({status:'no matches'})
                    }

                    this.setState({
                    images: images.hits,
                    status: 'resolved',
                    totalPage: images.totalHits
                    })
            })
                .catch(error => {
                    this.setState({ status: 'rejected' })
                })
            };


        if (prevState.page !== page) {
                 this.setState({ status: 'pending' });
             setTimeout(() => {
                    fetchApi(keyWord, page).then(images => {
                        if (images.hits.length === 0) {
                            console.log('no matches')
                       return  this.setState({status:'no matches'})
                    }
    
                        this.setState(prevState => ({
                        images: [...prevState.images, ...images.hits],
                        status: 'resolved',
                        totalPage: images.totalHits}))
                    })
                    .catch(error => {
                        this.setState({ status: 'rejected' })
                    })
                }, 1000);
            }
            
            
            if (page > 1) {
                const CARD_HEIGHT = 300; // preview image height
                window.scrollBy({
                    top: CARD_HEIGHT * 2,
                    behavior: 'smooth',
                });
            };
            
 };
  

    handlerLoadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));       
    };
    

    resetPage = () => {
        this.setState({page:1})
    };

    resetImages = () => {
        this.setState({images:[]})
    };

    render() {
        const { images, status } = this.state;
        const { keyWord } = this.props;

        if (status === 'resolved') {
            return (
                 <>
                <Gallery >
                <ImageGalleryItem images={images} />
                 </Gallery>
                 <Button onClick = {this.handlerLoadMore} />
                 </>
            )
        };
        if (status === 'pending') {    
            return (<>
                <Gallery >
                    <ImageGalleryItem images={images} />
                 </Gallery>
                <Loader />
            </>)   
        };
        if (status === 'rejected') {
            return <p>Sorry something went wrong</p>

        };
        if (status === 'no matches') {
            return <p>Incorrect request {keyWord} </p>
        }
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


//  if (page > 1) {
//           const CARD_HEIGHT = 300; // preview image height
//           window.scrollBy({
//             top: CARD_HEIGHT * 2,
//             behavior: 'smooth',
//           });
//         }