import React from 'react'
import './ModalDesign.css';

const MyModal = ({onClose}) => {
    return (
      <div className="MyModal">
        <div className="content">
            <form>
          <input name="title"></input><p></p>
          <input name="content"></input>
          </form><p></p>
          <button onClick="">수정</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    );
  };
  
  export default MyModal;