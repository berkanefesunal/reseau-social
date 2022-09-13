import { userInfo } from "api/api";
import React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setUserLoading(true);
      try {
        const res = await userInfo();

        if (res.status === 200) {
          setUser(res.data);
          localStorage.setItem("userId", res.data._id.toString());
        }
      } catch (err) {
        console.log(err);
      }
      setUserLoading(false);
    })();
  }, []);

  const values = {
    user,
    setUser,
    userLoading,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
