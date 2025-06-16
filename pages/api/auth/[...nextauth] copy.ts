import { prisma } from "@/lib/prismaClient";
import { supabase } from "@/lib/supabaseClient";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          throw new Error(error?.message || "Login failed");
        }
        // const {
        //   data: { users },
        //   errorUser,
        // } = await supabase.auth.admin.listUsers();
        // if (errorUser || !users) {
        //   throw new Error(errorUser?.message || "Failed to retrieve users");
        // }
        // const user = users.find((u) => u.email === email);
        // console.log("user", user);
        return {
          id: data.user.id,
          email: data.user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID! || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("signIn user:", user);
      console.log("account:", account);
      if (account?.provider === "google") {
        try {
          const existingProfile = await prisma.profiles.findUnique({
            where: { id: user.id },
          });
          console.log("existingProfile", existingProfile);
          if (!existingProfile) {
            await prisma.profiles.create({
              data: {
                id: user.id,
                name: user.name || "Unnamed",
                phone: "",
                street: "",
                city: "",
                state: "",
                zipcode: "",
              },
            });
            // } else {
            //   // Update the profile if it exists
            //   await prisma.profiles.update({
            //     where: { id: user.id },
            //     data: {
            //       name: user.name || "Unnamed",
            //       phone: existingProfile.phone,
            //       street: existingProfile.street,
            //       city: existingProfile.city,
            //       state: existingProfile.state,
            //       zipcode: existingProfile.zipcode,
            //     },
            //   });
          }
        } catch (error) {
          console.error("Error creating Google user profile:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      console.log("session@@@", session);
      console.log("token&&&", token);

      const profile = await prisma.profiles.findUnique({
        where: { id: token.sub },
      });

      console.log("profile0", profile);

      if (profile) {
        session.user.name = profile.name;
        session.user.phone = profile.phone;
        session.user.id = profile.id;
        session.user.street = profile.street;
        session.user.city = profile.city;
        session.user.state = profile.state;
        session.user.zipcode = profile.zipcode;
      }
      console.log("profile1", profile);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
