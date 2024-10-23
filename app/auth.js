import { getUserByName, insertUser } from "@/@/service/user/page";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
      console.log(user,"user");
      // console.log(account, "account");
      // console.log(profile,"profile");
      const isUserExist = await getUserByName(user.name);
      if (isUserExist.data.rows.length == 0) {
        let sendData = {
          USER_NAME: user.name,
          USER_TYPE: account.provider,
          USER_EMAIL: user.email
        }
        const resIns = await insertUser(sendData);
        console.log(resIns, "resIns");
      } else if (isUserExist.data.rows.filter(item => item.USER_TYPE == account.provider).length == 0) {
        let sendData = {
          USER_NAME: user.name,
          USER_TYPE: account.provider,
          USER_EMAIL: user.email
        }
        const resIns = await insertUser(sendData);
        console.log(resIns, "resIns");
      }
      return true; // อนุญาตให้ลงชื่อเข้าใช้
    },
    async session({ session, token, user }){      
      const isUserExist = await getUserByName(session.user.name);
      session.user.userType = isUserExist.data.rows[0].USER_TYPE;
      session.user.userSeq = isUserExist.data.rows[0].USER_SEQ;
      return session
    }
  },
});
