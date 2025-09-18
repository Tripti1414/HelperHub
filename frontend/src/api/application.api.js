import axios from "./axios";

export const getAllApplications = async () => {
  return axios.get("/applications");
};

export const respondToWorkers = async(workerId, jobId, response , userId) => {
   return axios.post("/workers/accept", {
      worker:workerId,
      jobId,
      response,  // "accepted" or "rejected"
      hierrId:userId
    });
}