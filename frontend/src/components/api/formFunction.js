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
       axios.post('  /api/positions/create',newPosition).then(res=>console.log(res.data));
       alert("New position has been created!");
    return;
}

export const createApplication =(newApplication) =>{
    return axios.post('  /api/applications/create',newApplication).then(res=>console.log(res.data));
}

export const createQuestion = (newQuestion) => {
	return axios.post('  /api/customQuestion/create',newQuestion).then(res=>console.log(res.data));

}
