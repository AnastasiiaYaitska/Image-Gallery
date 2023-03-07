import { GalleryItem, GalleryItemImg } from "./ImageGalleryItem.styled";


export const ImageGalleryItem = ({images}) => { 
   
    console.log(images);
    return <>
     {
            images.map(({webformatURL, id, tags}) =>  (<GalleryItem key={id} >
                    <GalleryItemImg src={webformatURL} alt={tags} />
                    </GalleryItem>))
       }
    </>
       
    
};