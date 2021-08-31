import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';

export const getCompanyDetail = async (companyId:string) => {
  const token = await auth.currentUser?.getIdToken();
  try {
    const res = await axios.get(
      config.apiUrl + '/api/user/enrollment-form/' + companyId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
