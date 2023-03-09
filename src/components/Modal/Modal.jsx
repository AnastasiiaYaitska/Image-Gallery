import { Overlay, ModalWindow } from './Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';


const modalRoot = document.querySelector('#modal-root') 


export class Modal extends Component{
    
    componentDidMount() {
        window.addEventListener('keydown', this.clickEsc)
    };

     componentWillUnmount() {
        window.removeEventListener('keydown', this.clickEsc);
    };
    

    clickEsc = (event) => {
        if (event.code === 'Escape') {
            this.props.closeModal()
        }
    };

    clickBackdrop = (event) => {
       
        console.log(event.target)
        console.log(event.currentTarget)
        if (event.target === event.currentTarget) {
             console.log('click on overlay')
            this.props.closeModal()
        }
    };



    render() {
        return createPortal(
            <Overlay onClick= {this.clickBackdrop}>
               <ModalWindow >
                  {this.props.children}
                </ModalWindow>
            </Overlay>, 
            modalRoot
        )
    }
}
