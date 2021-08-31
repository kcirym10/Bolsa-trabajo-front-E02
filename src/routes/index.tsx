import React from 'react';

//import async from "../components/Async";

import MainLayout from '../components/Layouts/MainLayout';
import RouteWithLayout from '../components/Layouts/RouteWithLayout';

import { UserContext } from '../components/Authentication/UserProvider';

import SignIn from '../components/Authentication/SignIn';
import SignUp from '../components/Authentication/SignUp';
import FormEmployee from '../components/Forms/FormEmployee';
import FormOrganization from '../components/Forms/FormOrganization';
import CompanyDashboard from '../components/Pages/CompanyDashboard';
import Home from '../components/Home/Home';
import ExplorarPostulantes from '../components/Postulantes/ExplorarPostulantes'
import DetallePostulante from '../components/Postulantes/DetallePostulante'
import SolicitudesPostulante from '../components/Pages/SolicitudesPostulante'
import SolicitudesEmpresa from '../components/Pages/SolicitudesEmpresa'
import AdminLayout from '../components/Layouts/AdminLayout';
import AdminHome from '../components/PanelAdmin/AdminHome';
import UserAccept from '../components/PanelAdmin/UserAccept';
import UserAcceptDetails from '../components/PanelAdmin/UserAcceptDetail';
import RegisterAdmins from '../components/PanelAdmin/RegisterAdmins';
import ManageAdmins from '../components/PanelAdmin/ManageAdmins';
import FormPosition from '../components/Forms/FormPosition';

//const SignIn = async(() => import('../components/Authentication/SignIn'));
//const SignUp = async(() => import('../components/Authentication/SignUp'));
//const PanelAdmin = async(() => import('../components/PanelAdmin/PanelAdmin'));


export const employeeRoutes = [
  {
    path: '/form-employee',
    layout: MainLayout,
    layoutProps: null,
    component: FormEmployee
  },
  {
    path: '/missolicitudes',
    layout: MainLayout,
    layoutProps: null,
    component: SolicitudesPostulante
  },
]

export const companyRoutes = [
  {
    path: '/dashboard',
    layout: MainLayout,
    layoutProps: null,
    component: CompanyDashboard
  },
  {
    path: '/postulantes',
    layout: MainLayout,
    layoutProps: null,
    component: ExplorarPostulantes
  },
  {
    path: '/postulantes/:id',
    layout: MainLayout,
    layoutProps: null,
    component: DetallePostulante
  },
  {
    path: '/form-organization',
    layout: MainLayout,
    layoutProps: null,
    component: FormOrganization
  },
  {
    path: '/form-position',
    layout: MainLayout,
    layoutProps: null,
    component: FormPosition
  },
  {
    path: '/solicitudes',
    layout: MainLayout,
    layoutProps: null,
    component: SolicitudesEmpresa
  }
]

export const adminRoutes = [
  {
    path: '/admin',
    layout: AdminLayout,
    layoutProps: null,
    component: AdminHome
  },
  {
    path: '/admin/accept-users',
    layout: AdminLayout,
    layoutProps: null,
    component: UserAccept
  },
  {
    path: '/admin/accept-users/:userId',
    layout: AdminLayout,
    layoutProps: null,
    component: UserAcceptDetails
  },
  {
    path: '/admin/register-admins',
    layout: AdminLayout,
    layoutProps: null,
    component: RegisterAdmins
  },
  {
    path: '/admin/manage-admins',
    layout: AdminLayout,
    layoutProps: null,
    component: ManageAdmins
  }
]

export const mainRoutes = [
  {
    path: '/home',
    layout: MainLayout,
    layoutProps: null,
    component: Home
  }
]

export const authRoutes = [
  {
    path: '/',
    layout: null,
    layoutProps: null,
    component: SignIn
  },
  {
    path: '/sign-in',
    layout: null,
    layoutProps: null,
    component: SignIn
  },
  {
    path: '/register',
    layout: null,
    layoutProps: null,
    component: SignUp
  }
]
