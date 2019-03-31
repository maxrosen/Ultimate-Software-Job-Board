import axios from 'axios';

export const getList =() =>{
    return axios.get('http://localhost:4000/api/positions/',{headers:{"Content-type":"application/json"}}).then(res=>{console.log(res.data); return res.data})
}