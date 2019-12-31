import React, { Component } from 'react'
import './ModalDesign.css';
import './../index.css'
import './PostView'
import api from '../api';
import PostView from './PostView';

export default class MyModal extends Component {

  handlingChange = (event) => {
    this.setState({
      [event.target.value]: event.target.value
    })
  }
  render() {
    const {title, content, edit, onClose, id} = this.props
    return (
      <div>
        <div className="MyModal">
          <div className="content round">
            <center>
            <form>
              <input name="title" className="form_title" defaultValue={title} onChange={this.handlingChange}></input><p></p>
              <input name="content" className="form_content" defaultValue={content} onChange={this.handlingChange}></input>
            </form>
            <p></p>
            <button value={id} onClick={edit}>수정</button>
            <button onClick={onClose}>취소</button></center>
          </div>
        </div>
      </div>
    );
  }
  }