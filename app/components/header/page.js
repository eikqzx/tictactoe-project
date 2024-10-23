"use client";
import * as React from "react";
import {
    Box,
    IconButton,
    Typography,
    Avatar,
    Sheet,
    Tooltip,
} from "@mui/joy";
import { signOut, useSession } from "next-auth/react";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import localFont from 'next/font/local';

const tictactoe = localFont({
    src: "./fonts/TATicTacToPersonalUser.ttf",
    variable: "--font-tictactopersonaluser",
    weight: "100 900",
});


function Header({ title }) {
    const { data: session ,status } = useSession();
    const router = useRouter();
    // console.log(session,"session");
    
    React.useEffect(() => {
        if (status == 'unauthenticated') {
            router.push('/');
        }
    }, [status])

    return (
        <Sheet
            variant="outlined"
            sx={{
                position: 'fixed', // แก้ไขให้ header คงที่ด้านบน
                top: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: 'sm',
                boxShadow: 'sm',
                zIndex: 1000, // เพื่อให้ Header อยู่เหนือเนื้อหาอื่น
            }}
        >
            <Typography fontFamily={tictactoe.style.fontFamily} level="h1">Tic Tac Toe</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar alt={session?.user?.name}  src={session?.user?.image}/>
                <Typography level="h4">{session?.user?.name}</Typography>
                <Tooltip title={"ออกจากระบบ"}>
                    <IconButton onClick={() => signOut()}><Logout /></IconButton>
                </Tooltip>
            </Box>
        </Sheet>
    );
}

export default Header;
