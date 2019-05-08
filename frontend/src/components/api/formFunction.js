import axios from 'axios';
import jwt_decode from 'jwt-decode';


export const createPosition =(tempPosition) =>{
	let user = jwt_decode(localStorage.jwttoken);
	const newPosition = {
        title: tempPosition.Title,
        description: tempPosition.Description,
        companyId: user.companyId,
        companyName: user.companyName,
        managerId: user.employeeId
   	}
    return axios.post('http://localhost:4000/api/positions/create',newPosition).then(res=>console.log(res.data));
}

export const createApplication =(newApplication) =>{
    return axios.post('http://localhost:4000/api/applications/create',newApplication).then(res=>console.log(res.data));
}

export const createQuestion = (newQuestion) => {
	return axios.post('http://localhost:4000/api/customQuestion/create',newQuestion).then(res=>console.log(res.data));
}