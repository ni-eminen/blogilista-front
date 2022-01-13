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
};
  const response = await axios.post(baseUrl, content, config)
  return response.data
}

export default { getAll, setToken, postNewBlog }