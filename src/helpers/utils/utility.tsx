import { SweetAlertOptions } from "sweetalert2";

export function createErrorOptions(error: any): SweetAlertOptions {
  const msg = error.code ? `[${error.code}] ${error.message}` : error.message
  return {
    title: error.name,
    text: msg,
    icon: 'error',
    confirmButtonText: 'Ok',
  };
}

export function getNotImplementedOptions(msg: string): SweetAlertOptions {
  return {
    title: 'Error',
    text: `${msg} not implemented.`,
    icon: 'error',
    confirmButtonText: 'Ok',
  }
}

export function isEmployee(user: any) {
  return (user.type === 'employee');
}

export function isCompany(user: any) {
  return (user.type === 'company');
}

export function isAdmin(user: any) {
  return (user.type === 'admin');
}

export function isSuperAdmin(user: any) {
  return (user.type === 'super-admin');
}

export function isMinEmployee(user: any) {
  return (isEmployee(user) || isAdmin(user) || isSuperAdmin(user));
}

export function isMinCompany(user: any) {
  return (isCompany(user) || isAdmin(user) || isSuperAdmin(user));
}

export function isMinAdmin(user: any) {
  return (isAdmin(user) || isSuperAdmin(user));
}
