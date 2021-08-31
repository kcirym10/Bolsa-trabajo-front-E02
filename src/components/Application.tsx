import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import FormEmployee from "./Forms/FormEmployee";
import FormOrganization from "./Forms/FormOrganization";
import MainLayout from './Layouts/MainLayout';
import RouteWithLayout from './Layouts/RouteWithLayout';
import Home from './Home/Home';
import ExplorarPostulantes from './Postulantes/ExplorarPostulantes';
import DetallePostulante from './Postulantes/DetallePostulante';
import { UserContext } from './Authentication/UserProvider';

import { employeeRoutes, companyRoutes, adminRoutes, mainRoutes, authRoutes} from '../routes/index';

import AuthGuard from './Guards/AuthGuard';
import AdminGuard from './Guards/AdminGuard';
import CompanyGuard from './Guards/CompanyGuard';
import EmployeeGuard from './Guards/EmployeeGuard';
import SignedInGuard from './Guards/SignedInGuard';


const mapRoutes = (routes: any, guard: any) => routes.map((route: any, index: number) => {
  return <RouteWithLayout
            layout={route.layout}
            exact path={route.path}
            layoutProps={route.layoutProps}
            component={route.component}
            guard={guard}
          />
});


// ToDo: Change guards for each type of route (minEmployee, minCompany, etc.)
function Application() {
  // Get user context here:
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Switch>
        {mapRoutes(employeeRoutes, EmployeeGuard)}
        {mapRoutes(companyRoutes, CompanyGuard)}
        {mapRoutes(adminRoutes, AdminGuard)}
        {mapRoutes(mainRoutes, AuthGuard)}
        {mapRoutes(authRoutes, SignedInGuard)}
        <Route
        render={() => (
          <div>
            <h1>404 not found</h1>
          </div>
        )}
      />
      </Switch>
    </Router>
  );
}
export default Application;
