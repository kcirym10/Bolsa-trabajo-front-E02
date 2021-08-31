import React from 'react';
import { UserContext } from '../Authentication/UserProvider';
import { isEmployee, isCompany, isMinAdmin } from '../../helpers/utils/utility';
import { Redirect } from "react-router-dom";

function Home() {
  const { user } = React.useContext(UserContext);

  if (isEmployee(user)) {
    return <Redirect to="/missolicitudes" />;
  } else if (isCompany(user)) {
    return <Redirect to="/postulantes" />;
  } else if (isMinAdmin(user)) {
    return <Redirect to="/admin" />;
  } else {
    return (
      <div>
        <h1>404 not found</h1>
      </div>
    );
  }
}

export default Home;
