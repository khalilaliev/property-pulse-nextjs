import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";

interface ISessionUser {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  userId: {
    id?: string | null;
  };
}

export const getSessionUser = async (): Promise<ISessionUser | null> => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  return {
    user: session.user,
    // @ts-ignore
    userId: session.user.id,
  };
};
