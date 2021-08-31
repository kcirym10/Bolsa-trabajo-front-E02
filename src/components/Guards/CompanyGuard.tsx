import * as React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../Authentication/UserProvider';
import { auth} from '../../firebase';
import { isMinCompany } from '../../helpers/utils/utility';

interface CompanyGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function CompanyGuard({ children }: CompanyGuardType) {

  const { user } = React.useContext(UserContext);

  if (!user || !isMinCompany(user)) {
    return <Redirect to="/sign-in" />;
  }

  return children;
}

export default CompanyGuard;
