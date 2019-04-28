import axios from 'axios';

export const getList =(page) =>{
    return axios.get('http://localhost:4000/api/positions/page',{params:{page:page}}).then(res=>{console.log(res.data); return res.data})
}

export const getCount =() =>{
    return axios.get('http://localhost:4000/api/positions/count').then(res=>{ return res.data})
}