import React, { Component } from 'react'
import './ModalDesign.css';
import './../index.css'
import './PostView'
import PostView from './PostView';

const MyModal = ({onClose}) => {
    return (
      <div>
        <div className="MyModal">

          <div className="content round">
            <center>
            <form>
              <input name="title" className="form_title"></input><p></p>
              <input name="content" className="form_content"></input>
            </form>
            <p></p>
            <button onClick="">수정</button>
            <button onClick={onClose}>취소</button></center>
          </div>
        </div>
      </div>
    );
  };
  
  export default MyModal;