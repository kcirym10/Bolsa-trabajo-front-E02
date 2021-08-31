export interface UserType {
  type: 'employee' | 'company'
};

export enum UserTypeEnum {
  employee = "employee",
  company = "company"
}

export function translateToUserType(str:string) : UserTypeEnum {
  if(str == "company") {
      return UserTypeEnum.company
  }

  return UserTypeEnum.employee;
}

export interface User {
  id: string,
  createdBy: string,
  email: string,
  type: string,
  username: string,
  state: string,
}