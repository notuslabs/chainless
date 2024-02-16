import { Avalanche } from "@particle-network/chains";
import * as particleAuth from "@particle-network/rn-auth";
import { router } from "expo-router";
import { useEffect, useState, createContext, useContext } from "react";

interface AuthContextValue {
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  userInfo: particleAuth.UserInfo | undefined;
  isLoading: boolean;
  key: string;
}

const chainInfo = Avalanche;
const env = particleAuth.Env.Dev;
const type = particleAuth.LoginType.Email;
const supportAuthType = [particleAuth.SupportAuthType.Email];

const AuthContext = createContext<AuthContextValue | null>(null);

export function SessionProvider(props: React.PropsWithChildren) {
  const [key, setKey] = useState<string>("");
  const [userInfo, setUserInfo] = useState<particleAuth.UserInfo | undefined>();
  const [isSignIn, setIsSignIn] = useState(true);

  async function login(email: string) {
    setIsSignIn(true);

    const result = await particleAuth.login(type, email, supportAuthType);

    if (result.status) {
      const userInfo = result.data as particleAuth.UserInfo;

      setUserInfo(userInfo);
      setIsSignIn(false);
      router.replace("/");
    } else {
      const error = result.data;
      console.log(error);
    }
  }

  async function logout() {
    const result = await particleAuth.fastLogout();
    if (result.status) {
      setUserInfo(undefined);
      setKey("");
      console.log(result.data);
    } else {
      const error = result.data;
      console.log(error);
    }
  }

  useEffect(() => {
    async function init() {
      particleAuth.init(chainInfo, env);
      const result = await particleAuth.isLogin();

      if (result) {
        //  setKey();
        const result = await particleAuth.getUserInfo();
        const userInfo = JSON.parse(result);
        setUserInfo(userInfo);
      }

      setIsSignIn(false);
    }

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        userInfo,
        isLoading: isSignIn,
        key
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}
