import { getUserByName, getUserByName1, insertUser } from "@/@/service/user/page";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret:process.env.AUTH_GITHUB_SECRET
    }),
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(user,"user");
      // console.log(account, "account");
      // console.log(profile,"profile");
      const isUserExist = await getUserByName(user.name);
      console.log(isUserExist,"isUserExist");
      
      if (isUserExist.data.rows.length == 0) {
        let sendData = {
          USER_NAME: user.name,
          USER_TYPE: account.provider,
          USER_EMAIL: user.email
        }
        const resIns = await insertUser(sendData);
        console.log(resIns, "resIns");
      } 
      if (isUserExist.data.rows.length != 0) {
        if (isUserExist.data.rows.filter(item => item.USER_TYPE == account.provider).length == 0) {
          let sendData = {
            USER_NAME: user.name,
            USER_TYPE: account.provider,
            USER_EMAIL: user.email
          }
          const resIns = await insertUser(sendData);
          console.log(resIns, "resIns");
        }
      } 
      return true;
    },
    async session({ session, token, user }){      
      const isUserExist = await getUserByName(session.user.name);
      if (isUserExist.data.rows.length != 0) {
        session.user.userType = isUserExist.data.rows[0].USER_TYPE;
        session.user.userSeq = isUserExist.data.rows[0].USER_SEQ;
        session.user.userScore = isUserExist.data.rows[0].USER_SCORE;
      } 
      return session
    }
  },
});
