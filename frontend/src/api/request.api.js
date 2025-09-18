import axios from "./axios";

export const getAllRequests = async()=>{
    return axios.get("/requests");
}