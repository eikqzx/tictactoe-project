"use client";
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, IconButton, Tooltip } from '@mui/joy';
import { Close, EmojiEvents } from '@mui/icons-material';
import { getTopScores } from '@/@/service/user/page';
import localFont from 'next/font/local';
import useMediaQuery from './useMediaQuery';

const tictactoe = localFont({
    src: "./fonts/TATicTacToPersonalUser.ttf",
    variable: "--font-tictactopersonaluser",
    weight: "100 900",
});

function Scoreboard() {
    const [topPlayers, setTopPlayers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        fetchTopPlayers();

        const interval = setInterval(() => {
            fetchTopPlayers();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    const fetchTopPlayers = async () => {
        try {
            const response = await getTopScores();
            const data = response.data.rows;
            setTopPlayers(data);
        } catch (error) {
            console.error('Error fetching top players:', error);
        }
    };

    const toggleScoreboard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isMobile ? (
                <Tooltip title="Top Scores">
                    <IconButton
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            zIndex: 1000,
                            backgroundColor: '#f0f0f0',
                            '&:hover': { backgroundColor: '#e0e0e0' },
                            borderRadius: '50%',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            padding: '12px',
                            transition: '0.3s ease',
                        }}
                        onClick={toggleScoreboard}
                    >
                        <EmojiEvents />
                    </IconButton>
                </Tooltip>
            ) : (
                <Card
                    sx={{
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        boxShadow: 'none',
                        border: 'none',
                        backgroundColor: 'var(--neutral)',
                    }}
                >
                    <Typography level="h2" sx={{ fontFamily: tictactoe.style.fontFamily, marginBottom: '16px', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                        Top 10 Players
                    </Typography>
                    <Grid container spacing={1}>
                        {topPlayers.map((player, index) => (
                            <Grid key={index} xs={12}>
                                <Typography fontFamily={tictactoe.style.fontFamily}>
                                    {index + 1}. {player.USER_NAME} - {player.USER_SCORE} points
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            )}

            {isMobile && isOpen && (
                <Card
                    sx={{
                        position: 'fixed',
                        top: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -20%)',
                        width: '90%',
                        maxWidth: '400px',
                        padding: '16px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 1200,
                        backgroundColor: '#fff',
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1300,
                        }}
                        onClick={toggleScoreboard}
                    >
                        <Close />
                    </IconButton>
                    <Typography fontFamily={tictactoe.style.fontFamily} level="h2" sx={{ marginBottom: '16px', textAlign: 'center' }}>
                        Top 10 Players
                    </Typography>
                    <Grid container spacing={1}>
                        {topPlayers.map((player, index) => (
                            <Grid key={index} xs={12}>
                                <Typography fontFamily={tictactoe.style.fontFamily}>
                                    {index + 1}. {player.USER_NAME} - {player.USER_SCORE} points
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            )}
        </>
    );
}

export default Scoreboard;
