import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: { 
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const {email, password} = credentials as {email: string, password: string};

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isValid) return null;

                return user;
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === "credentials" && user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: any) {
            if ("email" in token) {
                session.user.email = token.email;
            } 
            if ("name" in token) {
                session.user.name = token.name;
            }
            if ("id" in token) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
    }
}