import axios from 'axios';

export const getList =() =>{
    return axios.get('/api/users',{headers:{"Content-type":"application/json"}}).then(res=>{return res.data})
}

export const createPosition =(newPosition) =>{
    return axios.post('http://localhost:4000/api/positions/create',newPosition).then(res=>console.log(res.data));
}