import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';

export const getMatches = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.get(
      config.apiUrl + '/api/match',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error getting matches", error);
  }
};

export const updateMatch = async (id:string, state:string) => {//, jobId:string) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.put(
      config.apiUrl + '/api/match/' + id,
      {
        state,
        //jobId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error answering match", error);
  }
};

export const postMatch = async (employeeId:string, jobId:string, description:string) => {//, jobId:string) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.post(
      config.apiUrl + '/api/match/',
      {
        employeeId,
        jobId,
        description
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating match", error);
  }
};
