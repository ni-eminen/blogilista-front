import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postNewBlog = async (content) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, content, config)
    return response.data
}

const patchBlog = async (id) => {
    console.log('patchblog called with id', id)
    // const config = {
    //   headers: { Authorization: token }
    // }
    const response = await axios.patch(`${baseUrl}/${id}`, { likes: 0 })
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, setToken, postNewBlog, patchBlog, deleteBlog }