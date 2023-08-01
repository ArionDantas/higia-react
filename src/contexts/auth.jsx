import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const initialUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // Atualize o localStorage quando o estado do usuário mudar
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   const userToken = localStorage.getItem("user_token");
  //   const usersStorage = localStorage.getItem("users_bd");

  //   if (userToken && usersStorage) {
  //     const hasUser = JSON.parse(usersStorage)?.filter(
  //       (user) => user.email === JSON.parse(userToken).email
  //     );

  //     if (hasUser) setUser(hasUser[0]);
  //   }
  // }, []);

  const printNames = () => {
    const emailUser = JSON.parse(localStorage.getItem('users_bd'));
    console.log(emailUser[0]['email']);
    console.log(emailUser[0]['password']);
  };

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    // setUser(null);
    // localStorage.removeItem("user_token");

    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout, printNames }}
    >
      {children}
    </AuthContext.Provider>
  );
};
