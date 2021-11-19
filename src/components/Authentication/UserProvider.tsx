import React, { createContext, useEffect, useState } from 'react';
import { auth, getUserDocument } from '../../firebase';
import { Redirect, useHistory } from 'react-router-dom';

const default_user = {email: "fake@email.com",
          name: "Dummy Name",
          type: "employee",
          password: "password",
          phoneNumber: "phoneNumber"};

export const UserContext = createContext({user: default_user});

function UserProvider(props: any) {
  //const [user, setUser] = useState({user: localStorage.user ? JSON.parse(localStorage.user) : null});
  let user = {user: default_user};
  // onMount
  useEffect(() => {
    /*/
    // setObserver on authUser
    auth.onAuthStateChanged(async (authUser) => {
      const user_local: any = await getUserDocument(authUser);
      //const token = await authUser?.getIdToken();
      //console.log(token);
      setUser({user: user_local});

      if (user_local) {
        localStorage.user = JSON.stringify(user_local);
        return <Redirect to="/dashboard" />;
      } else {
        localStorage.clear();
        return <Redirect to="/" />;
      }
    });  /*/
  }, []);

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
}

export default UserProvider;
