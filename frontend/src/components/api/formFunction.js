import axios from 'axios';


export const createPosition =(newPosition) =>{
    return axios.post('http://localhost:4000/api/positions/create',newPosition).then(res=>console.log(res.data));
}

export const importPositions =(newPositions) =>{
    return axios.post('http://localhost:4000/api/positions/import',newPositions).then(res=>console.log(res.data));
}

export const importEmployees =(newEmployees) =>{
    return axios.post('http://localhost:4000/api/users/import',newEmployees).then(res=>console.log(res.data));
}

export const createApplication =(newApplication) =>{
    return axios.post('http://localhost:4000/api/applications/create',newApplication).then(res=>console.log(res.data));
}

export const createQuestion = (newQuestion) => {
	return axios.post('http://localhost:4000/api/customQuestion/create',newQuestion).then(res=>console.log(res.data));
}