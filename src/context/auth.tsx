import { Client } from "@notuslabs/wallet";
import { Avalanche } from "@particle-network/chains";
import * as particleAuth from "@particle-network/rn-auth";
import { ParticleInfo, ParticleProvider } from "@particle-network/rn-auth";
import { router } from "expo-router";
import { useEffect, useState, createContext, useContext } from "react";

interface AuthContextValue {
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  userInfo: particleAuth.UserInfo | undefined;
  isLoading: boolean;
  client: Client | undefined;
}

const chainInfo = Avalanche;
const env = particleAuth.Env.Dev;
const type = particleAuth.LoginType.Email;
const supportAuthType = [particleAuth.SupportAuthType.Email];

const projectId = process.env.EXPO_PUBLIC_PARTICLE_PROJECTID as string;
const clientKey = process.env.EXPO_PUBLIC_PARTICLE_CLIENTKEY as string;
ParticleInfo.projectId = projectId;
ParticleInfo.clientKey = clientKey;

const AuthContext = createContext<AuthContextValue | null>(null);

export function SessionProvider(props: React.PropsWithChildren) {
  const [address, setAddress] = useState<string | undefined>();
  const [provider, setProvider] = useState<ParticleProvider>();
  const [userInfo, setUserInfo] = useState<particleAuth.UserInfo | undefined>();
  const [isSignIn, setIsSignIn] = useState(true);
  const [client, setClient] = useState<Client | undefined>();

  async function login(email: string) {
    setIsSignIn(true);

    const result = await particleAuth.login(type, email, supportAuthType);

    if (result.status) {
      const userInfo = result.data as particleAuth.UserInfo;

      const provider = new ParticleProvider({
        clientKey,
        projectId
      });
      const address = await particleAuth.getAddress();

      setUserInfo(userInfo);
      setProvider(provider);
      setAddress(address);

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
      setProvider(undefined);
      setAddress(undefined);
      setClient(undefined);

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
        const result = await particleAuth.getUserInfo();
        const userInfo = JSON.parse(result);

        const provider = new ParticleProvider({
          clientKey,
          projectId
        });

        const address = await particleAuth.getAddress();

        setProvider(provider);
        setAddress(address);
        setUserInfo(userInfo);
      }

      setIsSignIn(false);
    }

    init();
  }, []);

  useEffect(() => {
    if (!provider) {
      return;
    }

    if (!address) {
      return;
    }

    const client = new Client({ provider, account: address as `0x${string}` });

    setClient(client);
  }, [provider, address]);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        userInfo,
        isLoading: isSignIn,
        client
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
