import * as React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../Authentication/UserProvider';
import { auth} from '../../firebase';
import { isMinAdmin } from '../../helpers/utils/utility';

interface AdminGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function AdminGuard({ children }: AdminGuardType) {

  const { user } = React.useContext(UserContext);

  if (!user || !isMinAdmin(user)) {
    return <Redirect to="/sign-in" />;
  }

  return children;
}

export default AdminGuard;
