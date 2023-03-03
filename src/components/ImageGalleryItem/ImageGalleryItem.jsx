


export const ImageGalleryItem = ({images}) => { 
   
    console.log(images);
    return <>
     {
            images.map(({webformatURL, id, tags}) =>  (<li key={id} className="gallery-item">
                    <img src={webformatURL} alt={tags} />
                    </li>))
       }
    </>
       
    
};