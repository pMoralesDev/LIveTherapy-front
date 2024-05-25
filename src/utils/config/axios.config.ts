import axios from "axios";

const token = localStorage.getItem('token');

export default axios.create(

    {
        baseURL:'/api',
        responseType: 'json',
        timeout: 6000,
        headers: {
            Authorization: `Bearer ${token}`
          },
    }

)