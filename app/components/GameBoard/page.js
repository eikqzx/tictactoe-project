"use client"
import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, Typography } from "@mui/joy";
import { getSmartMove } from './bot';
import localFont from 'next/font/local';
import { RestartAlt } from '@mui/icons-material';
import { getUserByName, updateScore } from '@/@/service/user/page';
import { useSession } from 'next-auth/react';

const tictactoe = localFont({
    src: "./fonts/TATicTacToPersonalUser.ttf",
    variable: "--font-tictactopersonaluser",
    weight: "100 900",
});

function GameBoard() {
    const { data: session } = useSession()
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [playerScore, setPlayerScore] = useState(0);
    const [winner, setWinner] = useState(null);
    const [consecutiveWins, setConsecutiveWins] = useState(0);
    const [difficulty, setDifficulty] = useState(0.5);
    const playerSymbol = 'X';
    const botSymbol = 'O';

    const handleClick = (index) => {
        if (board[index] === null && isPlayerTurn && !winner) {
            const newBoard = [...board];
            newBoard[index] = playerSymbol;
            setBoard(newBoard);
            setIsPlayerTurn(false);
        }
    };

    const updateScoreToDB = async (score) => {
        let objUpd = {
            USER_SEQ: session.user.userSeq,
            USER_SCORE: score
        }
        await updateScore(objUpd);
    }

    const checkWinner = (newBoard) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return newBoard[a];
            }
        }

        return null;
    };

    useEffect(() => {
        if (session) {
            console.log(session, "session");
            setPlayerScore(Number(session?.user?.userScore != null ? session?.user?.userScore : 0))
        }
    }, [session])

    useEffect(() => {
        const currentWinner = checkWinner(board);
        let score = 0
        if (currentWinner && !winner) {
            setWinner(currentWinner);
            if (currentWinner === playerSymbol) {
                score = playerScore + 1
                setPlayerScore(score);
                setConsecutiveWins(consecutiveWins + 1);
                if (consecutiveWins + 1 === 3) {
                    score = playerScore + 2
                    setPlayerScore(score);
                    setConsecutiveWins(0);
                }
                updateScoreToDB(score);
            } else if (currentWinner === botSymbol) {
                score = (playerScore === 0 ? 0 : playerScore - 1)
                setPlayerScore(score);
                setConsecutiveWins(0);
                updateScoreToDB(score);
            }

            setTimeout(() => {
                setBoard(Array(9).fill(null));
                setIsPlayerTurn(true);
                setWinner(null);
            }, 1000);

        } else if (board.every(cell => cell !== null) && !currentWinner && !winner) {
            setWinner('draw');

            setTimeout(() => {
                setBoard(Array(9).fill(null));
                setIsPlayerTurn(true);
                setWinner(null);
            }, 1000);
        }
    }, [board, winner, playerScore, consecutiveWins]);

    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const botMove = getSmartMove(board, botSymbol, playerSymbol, difficulty);
            if (botMove !== null) {
                const newBoard = [...board];
                newBoard[botMove] = botSymbol;
                setBoard(newBoard);
                setIsPlayerTurn(true);
            }
        }
    }, [isPlayerTurn, board, winner]);

    return (
        <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxShadow: 'none', border: 'none' }}>
            <Typography level="h2" sx={{ fontFamily: tictactoe.style.fontFamily, marginBottom: '16px', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                คะแนนผู้เล่น: {playerScore}
            </Typography>
            <Grid container spacing={1} sx={{ marginBottom: '16px' }}>
                <Grid>
                    <Button
                        onClick={() => setDifficulty(0.75)}
                        variant={difficulty === 0.75 ? 'solid' : 'outlined'}
                        sx={{
                            padding: '8px 16px',
                            backgroundColor: difficulty === 0.75 ? 'var(--highlight)' : 'transparent',
                            color: difficulty === 0.75 ? 'var(--foreground)' : 'var(--foreground)',
                            border: `2px solid ${difficulty === 0.75 ? 'var(--foreground)' : 'transparent'}`,
                            '&:hover': {
                                backgroundColor: 'var(--highlight)',
                                color: 'var(--neutral)',
                            },
                        }}
                    >
                        ง่าย
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        onClick={() => setDifficulty(0.5)}
                        variant={difficulty === 0.5 ? 'solid' : 'outlined'}
                        sx={{
                            padding: '8px 16px',
                            backgroundColor: difficulty === 0.5 ? 'var(--foreground)' : 'transparent',
                            color: difficulty === 0.5 ? 'var(--neutral)' : 'var(--foreground)',
                            border: `2px solid ${difficulty === 0.5 ? 'var(--foreground)' : 'transparent'}`,
                            '&:hover': {
                                backgroundColor: 'var(--foreground)',
                                color: 'var(--neutral)',
                            },
                        }}
                    >
                        ปกติ
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        onClick={() => setDifficulty(0.25)}
                        variant={difficulty === 0.25 ? 'solid' : 'outlined'}
                        sx={{
                            padding: '8px 16px',
                            backgroundColor: difficulty === 0.25 ? 'var(--muted)' : 'transparent',
                            color: difficulty === 0.25 ? 'var(--neutral)' : 'var(--foreground)',
                            border: `2px solid ${difficulty === 0.25 ? 'var(--foreground)' : 'transparent'}`,
                            '&:hover': {
                                backgroundColor: 'var(--muted)',
                                color: 'var(--neutral)',
                            },
                        }}
                    >
                        ยาก
                    </Button>
                </Grid>
            </Grid>


            <Grid container spacing={0} sx={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 1fr)',
                gap: 0,
                border: 'none',
            }}>
                {board.map((value, index) => (
                    <Grid key={index}
                        sx={{
                            backgroundColor: value === 'X'
                                ? 'var(--highlight)'
                                : value === 'O'
                                    ? 'var(--foreground)'
                                    : 'var(--neutral)',
                            '&:hover': {
                                backgroundColor: 'var(--muted)',
                            },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            aspectRatio: '1 / 1',
                            fontSize: '3rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            borderTop: index > 2 ? '2px solid black' : 'none',
                            borderLeft: index % 3 !== 0 ? '2px solid black' : 'none',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                        onClick={() => handleClick(index)}
                    >
                        <Typography level="h1" sx={{ fontFamily: tictactoe.style.fontFamily, fontSize: '4rem' }}>
                            {value}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {/* ปุ่มรีเซ็ต */}
            <Button
                sx={{
                    marginTop: '16px',
                    backgroundColor: '#ababab',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#737373',
                    },
                }}
                startDecorator={<RestartAlt />}
                onClick={() => {
                    setBoard(Array(9).fill(null));
                    setIsPlayerTurn(true);
                    setPlayerScore(0);
                    setWinner(null);
                    setConsecutiveWins(0);
                    updateScoreToDB(0);
                }}
            >
                รีเซ็ตเกมและคะแนน
            </Button>
        </Card>
    );
}

export default GameBoard;
