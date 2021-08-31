import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';

export const getEmployeesFiltered = async (body: any) => {
  const token = await auth.currentUser?.getIdToken();
  try {
    const res = await axios.post(
      config.apiUrl + '/api/user/filter',
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getEmployeeDetail = async (employeeId:string) => {
  const token = await auth.currentUser?.getIdToken();
  try {
    const res = await axios.get(
      config.apiUrl + '/api/user/enrollment-form/' + employeeId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
