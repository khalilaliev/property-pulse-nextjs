import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import SignInCallback from "next-auth";
import User from "@/models/User";
import connectDb from "@/config/database";
import { profile } from "console";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }): Promise<boolean> {
      await connectDb();
      const userExist = await User.findOne({ email: profile?.email });
      if (!userExist) {
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile?.email,
          username,
          image: profile?.image,
        });
      }
      return true;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          // @ts-ignore
          session.user.id = user._id.toString();
        }
      }
      return session;
    },
  },
};
