"use client";
import React from "react";
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
    src: "../fonts/TATicTacToPersonalUser.ttf",
    variable: "--font-tictactopersonaluser",
    weight: "100 900",
});

function Header({ title }) {
    const { data: session ,status } = useSession();
    const router = useRouter();
    
    React.useEffect(() => {
        if (status == 'unauthenticated') {
            router.push('/');
        }
    }, [status]);

    return (
        <Sheet
            variant="outlined"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: { xs: 1, sm: 2 },
                borderRadius: 'sm',
                boxShadow: 'sm',
                zIndex: 1000,
                height: { xs: '60px', sm: '80px' },
            }}
        >
            <Typography fontFamily={tictactoe.style.fontFamily} level="h1" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                Tic Tac Toe
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar slotProps={{ img: { referrerPolicy: 'no-referrer' } }} alt={session?.user?.name} src={session?.user?.image} />
                <Typography level="h1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {session?.user?.name}
                </Typography>
                <Tooltip title="ออกจากระบบ">
                    <IconButton onClick={() => signOut()}>
                        <Logout />
                    </IconButton>
                </Tooltip>
            </Box>
        </Sheet>
    );
}

export default Header;