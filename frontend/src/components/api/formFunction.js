import axios from 'axios';


export const createPosition =(newPosition) =>{
    return axios.post('/api/positions/create',newPosition).then(res=>console.log(res.data));
}

export const createApplication =(newApplication) =>{
    return axios.post('/api/applications/create',newApplication).then(res=>console.log(res.data));
}