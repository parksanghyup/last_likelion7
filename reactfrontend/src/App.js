import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';
import Modal from './Components/MyModal';
import ModalPortal from './Components/ModalPortal';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
      modal: false,
      temp_title: '',
      temp_content: '',
      temp_id:'',
    }
  }

  handleOpenModal = async (event) => {
    const result = await api.getPost(event.target.value);
    this.setState({
      temp_title: result.data['title'],
      temp_content: result.data['content'],
      temp_id: result.data['id'],
      modal: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      modal: false
    });
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    this.setState({ results: _results.data })
  }

  handlingChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handlingSubmit = async (event) => {
    event.preventDefault()
    let reuslt = await api.createPost({
      title: this.state.title,
      content: this.state.content,
    })
    this.setState({ title: '', content: '' })
    this.getPosts()
  }

  handlingDelete = async (event) => {
    await api.deletePost(event.target.value)
    this.getPosts()
  }

  handlingEdit = async (event) => {
    
    let _title = document.getElementsByClassName('form_title')[0].value
    let _content = document.getElementsByClassName('form_content')[0].value
    let a =await api.editPost(event.target.value, {
      title: _title,
      content: _content,
    })
    this.getPosts()
  }

 

  render() {

    return (
      <div className="App">

        {/* 타임라인 작성 부분 */}
        <div className="container">
          <div className="PostingSection">
            <h2>타임라인 작성</h2>
            <form onSubmit={this.handlingSubmit}>
              {/* <input name="title"
                value={this.state.title}
                onChange={this.handlingChange}
              /> */}
              <textarea className="textarea1" placeholder="무슨 생각 중이신가요?" name="title" value={this.state.title} onChange={this.handlingChange}/>

              <textarea
                className="textarea1 textarea2"
                placeholder="내용을 입력해주세요."
                name="content"
                value={this.state.content}
                onChange={this.handlingChange}
              />

              <button className="new_btn" type="submit">작성</button>
            </form>
          </div>
        </div>

        {/* 게시글 보여주는 부분 */}
        <div className="container2 view_title">
          <b>게시물</b>
        </div>

        <div className="container">
        <div className="ViewSection">
          {
            this.state.results.map((post) =>
              <>
                {/* <div className="container"> */}
                  <PostView
                    key={post.id}
                    title={post.title}
                    content={post.content}                
                  />
                  
                  <button value={post.id} style={{color: 'rgb(61, 145, 255)', border: 0, outline: 0}} onClick={this.handleOpenModal}>수정하기</button>
                  <button value={post.id} style={{color: 'red', border: 0, outline: 0}} onClick={this.handlingDelete}>삭제하기</button>
                  <hr class="hr_"/>

                  {/* <button type="button" class="btn btn-outline-info btn-sm btn_custom" data-toggle="modal" data-target="#post-{{ post.id }}">수정하기</button> 
                  <button type="submit" style={{color: 'red', border: 0, outline: 0}} onclick="confirm('삭제하시겠습니까?')">삭제하기</button> */}
                  
                  
              {/* </div> */}
              </>
            )
          }
        </div>
        </div>

        {this.state.modal && (
                  <ModalPortal>
                    <Modal 
                    onClose={this.handleCloseModal} 
                    title={this.state.temp_title} 
                    content={this.state.temp_content} 
                    id={this.state.temp_id}
                    edit={this.handlingEdit}
                    />
                  </ModalPortal>
                )}
      </div>
    );
  }
}

export default App;
