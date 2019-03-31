import axios from 'axios';


export const createPosition =(newPosition) =>{
    return axios.post('http://localhost:4000/api/positions/create',newPosition).then(res=>console.log(res.data));
}