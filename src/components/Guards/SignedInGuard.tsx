import * as React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../Authentication/UserProvider';
import { auth} from '../../firebase';

interface SignedInGuardType {
  children: React.ReactNode;
}

// For routes that shouldn't be accessed by users who've signed in
function SignedInGuard({ children }: SignedInGuardType) {

  const { user } = React.useContext(UserContext);

  //console.log(auth.currentUser);

  if (user) {
    return <Redirect to="/home" />;
  }

  return children;
}

export default SignedInGuard;
