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
    }
  }

  handleOpenModal = () => {
    this.setState({
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
    console.log(_results)
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
    console.log("작성완료\n", reuslt.data);
    this.setState({ title: '', content: '' })
    this.getPosts()
  }

  handlingDelete = async (event) => {
    await api.deletePost(event.target.value)
    this.getPosts()
  }

  handlingEdit = async (event) => {
    await api.getPost(event.target.value)
  }

  render() {

    return (
      <div className="App">
        <div className="PostingSection">
          <h2>타임라인 작성</h2>
          <form onSubmit={this.handlingSubmit}>
            <input name="title"
              value={this.state.title}
              onChange={this.handlingChange}
            />
            <textarea
              name="content"
              value={this.state.content}
              onChange={this.handlingChange}
            />
            <button type="submit">작성</button>
          </form>
        </div>
        <div className="ViewSection">
          {
            this.state.results.map((post) =>
              <>
                <PostView
                  key={post.id}
                  title={post.title}
                  content={post.content}
                />
                <button value={post.id} onClick={this.handlingDelete}>삭제</button>
                <button value={post.id} onClick={this.handleOpenModal}>수정</button>

              </>
            )
          }
        </div>       
        {this.state.modal && (
                  <ModalPortal>
                    <Modal onClose={this.handleCloseModal} />
                  </ModalPortal>
                )}
      </div>
    );
  }
}

export default App;
