import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      phone?: string | null;
      name?: string | null;
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zipcode?: string | null;
    };
  }
}
