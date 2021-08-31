import * as React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../Authentication/UserProvider';
import { auth} from '../../firebase';
import { isMinEmployee } from '../../helpers/utils/utility';

interface EmployeeGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function EmployeeGuard({ children }: EmployeeGuardType) {

  const { user } = React.useContext(UserContext);

  if (!user || !isMinEmployee(user)) {
    return <Redirect to="/sign-in" />;
  }

  return children;
}

export default EmployeeGuard;
