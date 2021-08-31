import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';
import { CompanyForm, EmployeeForm } from '../model/Forms';

export const getEnrollmentForm = async (userId: any) => {
  if (!userId) return undefined;

  const token = await auth.currentUser?.getIdToken();

  try {
    const res = await axios.get(config.apiUrl + '/api/user/enrollment-form/' + userId,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.enrollmentForm)

      if(res.status == 200) {
        return res.data.enrollmentForm;
      }
      return undefined;
  }
  catch (error) {
    console.error("Error fetching enrollment form", error);
    return undefined;
  }
}

export const postEmployeeEnrollmentForm = async (enrollmentForm: any) => {
  if (!enrollmentForm) return null;
  const token = await auth.currentUser?.getIdToken();
  try {
    const res = await axios.post(
      config.apiUrl + '/api/user/enrollment-form', enrollmentForm, {
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

export const getOrganizationForm = async (userId: any) => {
  if (!userId) return undefined;

  const token = await auth.currentUser?.getIdToken();

  try {
    const res = await axios.get(config.apiUrl + '/api/user/enrollment-form/' + userId,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.enrollmentForm)

      if(res.status == 200) {
        return res.data.enrollmentForm;
      }
      return undefined;
  }
  catch (error) {
    console.error("Error fetching enrollment form", error);
    return undefined;
  }
}

export const postOrganizationEnrollmentForm = async (enrollmentForm: any) => {
  if (!enrollmentForm) return null;
  const token = await auth.currentUser?.getIdToken();
  try {
    const res = await axios.post(
      config.apiUrl + '/api/user/enrollment-form', enrollmentForm, {
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