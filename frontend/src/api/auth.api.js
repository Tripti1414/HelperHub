import axios from "./axios"

export const loginApi =  (data)=>{
    return axios.post("/users/login", data)
}
export const registerApi = (data) => {
    
    return axios.post("/users/register", data)
}

export const logoutApi = () => {
    return axios.get("/users/logout")
}

export const getUserApi = ()=>{
    return axios.get("/users/verify")
}