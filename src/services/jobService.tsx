import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';

export const getJobs = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.get(
      config.apiUrl + '/api/job',
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

export const findOneJob = async (id:string) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.get(
      config.apiUrl + '/api/job/' + id,
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

export const postJob = async (job: any) => {
  if (!job) return null;
  const token = await auth.currentUser?.getIdToken();
  debugger;
  try {
    const res = await axios.post(
      config.apiUrl + '/api/job', job, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    );
    return res.data;
  } catch (error) {
    console.error("Error posting job", error);
  }
};
