export enum AdminType {
    admin = "admin",
    superAdmin = "super-admin"
}

export function translateToAdminType(str:string) : AdminType {
    if(str === "super-admin") {
        return AdminType.superAdmin
    }

    return AdminType.admin;
}

export interface AdminCreate {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    type: AdminType;
}

export interface AdminUpdate {
    username: string;
    email: string;
    password?: string;
    phoneNumber: string;
    type: AdminType;
    state: string;
}

export interface Admin {
    id: string,
    createdBy: string,
    email: string,
    type: string,
    username: string,
    phoneNumber: string,
    state: string,
}