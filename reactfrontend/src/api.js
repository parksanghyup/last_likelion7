import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api"


export default {

    // 모든글
    getAllPosts() {
        return axios.get('/posts/')
    },

    // 글작성
    createPost(data) {
        return axios.post('/posts/',data)
    },

    deletePost(id) {
        return axios.delete('/posts/'+String(id))
    },

    getPost(id) {
        return axios.get('/posts/'+String(id))
    },

    editPost(id, data) {
        return axios.put('/posts/'+String(id)+'/', data)
    }

}