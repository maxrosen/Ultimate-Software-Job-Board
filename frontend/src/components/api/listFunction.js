import axios from 'axios';

export const getList =(page) =>{
    return axios.get('http://localhost:4000/api/positions/page',{params:{page:page}}).then(res=>{console.log(res.data); return res.data})
}

export const getCompanyList =(page, companyId) =>{
	let url = 'http://localhost:4000/api/positions/page/company/' + companyId;
    return axios.get(url,{params:{page:page, companyId:companyId}}).then(res=>{console.log(res.data); return res.data})
}

export const getCount =() =>{
    return axios.get('http://localhost:4000/api/positions/count').then(res=>{ return res.data})
}

export const getCompanyCount =(companyId) =>{
	let url = 'http://localhost:4000/api/positions/count/company/' + companyId;
    return axios.get(url, {params:{companyId:companyId}}).then(res=>{ return res.data})
}

export const getApps =(page) =>{
    return axios.get('http://localhost:4000/api/applications/',{params:{page:page}}).then(res=>{console.log(res.data); return res.data})
}

export const getAppCount =() =>{
    return axios.get('http://localhost:4000/api/applications/count').then(res=>{ return res.data})
}

export const getCustomQuestions =() =>{
	// return "something isn't working";
    return axios.get('http://localhost:4000/api/customquestions/').then(res=>{ return res.data})
}
