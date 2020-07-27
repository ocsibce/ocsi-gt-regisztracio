import React from 'react';
import ModalContainer from 'react-modal';
import { Markdown } from '../../utils/types';
import styled from 'styled-components';

type ModalProps = {
    dataArray: Markdown[],
    modalTitle: string,
    onAccept: () => void,
    onClose: () => void,
    isOpen: boolean
}

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      padding: '5%',
      paddingTop: '2%',
      paddingBottom: '2%',
      backgroundColor: '#f9db53',
      borderRadius: '5px',
    }
  };

const ModalHead = styled.div`
    margin-bottom: 16px;
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: center;
`;

const ModalButtonContainer = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: space-around;
`;

const ModalTextContainer = styled.div`
    width: 100%;
    overflow-y: scroll;
    height: 50vh;
    background-color: #fcf0b5;
    padding: 24px 12px;
    border-radius: 5px;
`;

const ModalHeader = styled.h2`
    text-align: center
`;

const ModalButton = styled.button`
    padding: 12px 8px;
    border: 1px solid white;
    border-radius: 30px;
    outline: none;
    margin: 0 16px;
    width: 100px;
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    cursor: pointer;

    &:hover{
        background-color: #ccc;
    }

    &:active {
        transform: translateY(4px);
    }
`;

ModalContainer.setAppElement('#root')

const Modal = ({dataArray, modalTitle, onAccept, onClose, isOpen}: ModalProps) => {

    console.log(dataArray);

    const modalContent = dataArray.map((data) => {
        if (data.type === 0) {
            return <p>{data.text}</p>
        }
        return <ModalHeader> {data.text} </ModalHeader>
    })

    return <ModalContainer isOpen={isOpen} style={customStyles} contentLabel={modalTitle} >
        <ModalHead><h1>{modalTitle}</h1></ModalHead>
        <ModalTextContainer>
            {modalContent}
        </ModalTextContainer>
        <ModalActions>
            <ModalButtonContainer>
                <ModalButton onClick={onAccept} >Elfogadom</ModalButton>
                <ModalButton onClick={onClose} >Bezárom</ModalButton>
            </ModalButtonContainer>
        </ModalActions>
    </ModalContainer>;
}

export default Modal;