import axios from 'axios';

export const getList =(page) =>{
    return axios.get('/api/positions/page',{params:{page:page}}).then(res=>{console.log(res.data); return res.data})
}

export const getCount =() =>{
    return axios.get('/api/positions/count').then(res=>{ return res.data})
}

export const getApps =(page) =>{
    return axios.get('/api/applications/',{params:{page:page}}).then(res=>{console.log(res.data); return res.data})
}

export const getAppCount =() =>{
    return axios.get('/api/applications/count').then(res=>{ return res.data})
}
