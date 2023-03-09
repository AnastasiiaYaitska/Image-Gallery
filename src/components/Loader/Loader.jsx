import { ColorRing } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';


export const Loader = () => {
    return (
        <Wrapper>
        <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  WrappererStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
        </Wrapper>
    )
 };


// library react load spinner 