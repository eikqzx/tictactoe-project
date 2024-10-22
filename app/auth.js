import { insertUser,getUserByEmail } from "@/@/service/user/page";
import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
      const isUserExist = await getUserByEmail(user.email);
      console.log(isUserExist,"isUserExist");
      if (isUserExist.data.rows.length == 0) {
        let sendData = {
            USER_NAME: user.email 
        }
        // ถ้าเป็นผู้ใช้ใหม่ ให้ทำการ insert ข้อมูลผู้ใช้เข้าไปในฐานข้อมูล
        const resIns = await insertUser(sendData);
        console.log(resIns,"resIns");
      }
      return true; // อนุญาตให้ลงชื่อเข้าใช้
    },
  },
});
