import axios from 'axios';

export const getList =() =>{
    return axios.get('/api/users',{headers:{"Content-type":"application/json"}}).then(res=>{return res.data})
}