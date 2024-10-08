"use client";

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { IGlobalContext } from "@/interfaces";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IGlobalProvider {
  children: ReactNode;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export function GlobalProvider({ children }: IGlobalProvider) {
  const [unreadMessage, setUnreadMessage] = useState<number>(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadMessage(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadMessage, setUnreadMessage }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
