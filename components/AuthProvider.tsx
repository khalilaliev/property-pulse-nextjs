"use client";
import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface IChildrenProp {
  children: ReactNode;
}
const AuthProvider: FC<IChildrenProp> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
