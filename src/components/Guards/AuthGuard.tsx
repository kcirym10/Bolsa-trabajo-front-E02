import * as React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../Authentication/UserProvider';
import { auth} from '../../firebase';

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }: AuthGuardType) {

  const { user } = React.useContext(UserContext);

  if (!user) {
    return <Redirect to="/sign-in" />;
  }

  return children;
}

export default AuthGuard;
