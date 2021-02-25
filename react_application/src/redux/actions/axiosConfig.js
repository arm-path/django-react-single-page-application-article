import axios from 'axios'

const axiosConfig = (config = axios.defaults) => {
    if (localStorage.getItem('access_token')) {
        config.headers.authorization = `JWT ${localStorage.getItem('access_token')}`
    }
    return config
}

export default axiosConfig