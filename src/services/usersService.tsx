import axios from 'axios'
import { config } from '../config';
import { auth } from '../firebase';
import { Admin } from '../model/Admins';
import { User } from '../model/Users';

export const getAdmins = async () => {
    const token = await auth.currentUser?.getIdToken();

    try {
        const res = await axios.get(config.apiUrl + '/api/admin',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        if (res.status == 200) {
            console.log(res.data)
            return res.data.admins;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching enrollment form", error);
        return [];
    }
}

export const getAdminsAndSuperAdmins = async () => {
    const token = await auth.currentUser?.getIdToken();

    try {
        const res = await axios.get(config.apiUrl + '/api/admin',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        if (res.status == 200) {
            console.log(res.data)
            return res.data.admins.concat(res.data["super-admins"]);
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching enrollment form", error);
        return [];
    }
}

export const registerAdmin = async (body: any) => {
    if (!body) return null;
    const token = await auth.currentUser?.getIdToken();
    try {
        const res = await axios.post(
            config.apiUrl + '/api/admin', body, {
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

export const deleteAdmin = async (id: string) => {
    if (!id) return null;
    const token = await auth.currentUser?.getIdToken();
    try {
        const res = await axios.delete(
            config.apiUrl + '/api/admin/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching user", error);
    }
}

export const getUsers = async (): Promise<User[]> => {
    const token = await auth.currentUser?.getIdToken();

    try {
        const res = await axios.get(config.apiUrl + '/api/admin',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        if (res.status == 200) {
            console.log(res.data)
            return res.data.employees.concat(res.data.companys);
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching enrollment form", error);
        return [];
    }
}

export const updateUser = async (id: string, body: any) => {
    const token = await auth.currentUser?.getIdToken();

    try {
        const res = await axios.put(
            config.apiUrl + '/api/admin/' + id, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
        );
        return res.data;
    }
    catch (error) {
        console.error("Error fetching enrollment form", error);
        return [];
    }
}