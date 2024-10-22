"use client";
import React from 'react'
import { signOut, useSession } from "next-auth/react";
import { Button, Card, Grid, Typography, useColorScheme } from "@mui/joy";

function MainGame() {
    const { data: session } = useSession();
    return (
        <Grid container spacing={2} sx={{ padding: '16px' }}> {/* เพิ่ม padding ให้ Main Content */}
            <Grid xs={12}>
                <NewTypography text={session?.user?.name} />
            </Grid>
            <Grid xs={12}>
                <Button onClick={() => signOut()}>Sign out</Button>
            </Grid>
        </Grid>
    )
}

export default MainGame

export const NewTypography = ({ text }) => {
    const { mode } = useColorScheme();
    return (
        <Typography color={mode == 'dark' ? 'primary' : 'neutral'}>{text}</Typography>
    );
}