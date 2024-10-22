"use client";
import { signIn,useSession } from "next-auth/react";
import { Button, Card, Grid, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Redirecting from "./components/redirect/page";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/main");
    }
  }, [session, router]); // ทำงานเมื่อ session เปลี่ยน

  return (
    <Grid
  container
  justifyContent="center"
  alignItems="center"
  style={{ minHeight: "100vh" }}
>
  {!session ? (
    <Grid>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          minWidth: '300px',
        }}
      >
        <Typography>กรุณาเข้าสู่ระบบ</Typography>
        <Button onClick={() => signIn("auth0")}>Sign in with Auth0</Button>
      </Card>
    </Grid>
  ) : (
    <Grid>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          minWidth: '300px',
        }}
      >
            <Redirecting/>
      </Card>
    </Grid>
  )}
</Grid>
  );
}