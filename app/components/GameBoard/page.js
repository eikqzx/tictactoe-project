import React, { useState, useEffect } from 'react';
import { Card, Grid, Button, Typography } from "@mui/joy";
import { getSmartMove } from './bot'; // ฟังก์ชันบอทที่ปรับแล้ว
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

    // ตรวจสอบว่ามีผู้ชนะหรือไม่
    const checkWinner = (newBoard) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // แนวนอน
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // แนวตั้ง
            [0, 4, 8], [2, 4, 6], // แนวทแยง
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return newBoard[a];
            }
        }

        return null;
    };

    const getUserScore = async () => {
        let resData = await getUserByName(session?.user?.name);
        if (resData?.data?.result?.code == 200) {
            setPlayerScore(Number(resData?.data?.rows[0]?.USER_SCORE == null ? 0 : resData?.data?.rows[0]?.USER_SCORE));
        }
    }

    useEffect(() => {
        getUserScore();
    }, [])

    // ตรวจสอบผู้ชนะในทุกการเปลี่ยนแปลงของกระดาน
    useEffect(() => {
        const currentWinner = checkWinner(board);
        let score = 0
        if (currentWinner && !winner) {
            // ตรวจสอบว่ามีผู้ชนะแล้วหรือไม่
            setWinner(currentWinner);
            if (currentWinner === playerSymbol) {
                score = playerScore + 1
                setPlayerScore(score); // ผู้เล่นชนะ เพิ่มคะแนน 1
                setConsecutiveWins(consecutiveWins + 1); // เพิ่มการนับชนะติดต่อกัน
                if (consecutiveWins + 1 === 3) {
                    score = playerScore + 2
                    setPlayerScore(score); // ได้คะแนนพิเศษเมื่อชนะครบ 3 ครั้งติดต่อกัน
                    setConsecutiveWins(0); // รีเซ็ตการนับชนะติดต่อกัน
                }
                updateScoreToDB(score);
            } else if (currentWinner === botSymbol) {
                score = (playerScore === 0 ? 0 : playerScore - 1)
                setPlayerScore(score); // ผู้เล่นแพ้ ลดคะแนน 1
                setConsecutiveWins(0); // รีเซ็ตการนับชนะติดต่อกันเมื่อแพ้
                updateScoreToDB(score);
            }

            // รีเซ็ตกระดานหลังจากประกาศผู้ชนะ
            setTimeout(() => {
                setBoard(Array(9).fill(null)); // รีเซ็ตกระดานเกม
                setIsPlayerTurn(true); // ผู้เล่นเริ่มก่อนเสมอหลังรีเซ็ต
                setWinner(null); // รีเซ็ตสถานะผู้ชนะ
            }, 1000); // ดีเลย์ 1 วินาทีก่อนรีเซ็ตกระดาน

        } else if (board.every(cell => cell !== null) && !currentWinner && !winner) {
            // ตรวจสอบกรณีที่เสมอ (กระดานเต็มและไม่มีผู้ชนะ)
            setWinner('draw'); // ประกาศว่าเสมอ

            // รีเซ็ตกระดานหลังจากเสมอ
            setTimeout(() => {
                setBoard(Array(9).fill(null)); // รีเซ็ตกระดานเกม
                setIsPlayerTurn(true); // ผู้เล่นเริ่มก่อนเสมอหลังรีเซ็ต
                setWinner(null); // รีเซ็ตสถานะผู้ชนะ
            }, 1000); // ดีเลย์ 1 วินาทีก่อนรีเซ็ตกระดาน
        }
    }, [board, winner, playerScore, consecutiveWins]);

    useEffect(() => {
        if (!isPlayerTurn && !winner) { // ตรวจสอบว่าเป็นเทิร์นของบอทและยังไม่มีผู้ชนะ
            const botMove = getSmartMove(board, botSymbol, playerSymbol, difficulty);
            if (botMove !== null) {
                const newBoard = [...board];
                newBoard[botMove] = botSymbol; // บอทเล่น
                setBoard(newBoard);
                setIsPlayerTurn(true); // สลับกลับมาให้ผู้เล่นเล่น
            }
        }
    }, [isPlayerTurn, board, winner]);

    return (
        <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '100%', boxShadow: 'none', border: 'none' }}>
            <Typography level="h2" sx={{ fontFamily: tictactoe.style.fontFamily, marginBottom: '16px' }}>
                คะแนนผู้เล่น: {playerScore}
            </Typography>
            <Grid container spacing={1} sx={{ marginBottom: '16px' }}>
                <Grid>
                    <Button
                        color={difficulty === 0.75 ? "success" : "primary"}
                        onClick={() => setDifficulty(0.75)}
                        variant={difficulty === 0.75 ? 'solid' : 'outlined'}
                        sx={{ padding: '8px 16px' }} // เพิ่ม padding
                    >
                        ง่าย
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        color={difficulty === 0.5 ? "success" : "primary"}
                        onClick={() => setDifficulty(0.5)}
                        variant={difficulty === 0.5 ? 'solid' : 'outlined'}
                        sx={{ padding: '8px 16px' }} // เพิ่ม padding
                    >
                        ปกติ
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        color={difficulty === 0.25 ? "success" : "primary"}
                        onClick={() => setDifficulty(0.25)}
                        variant={difficulty === 0.25 ? 'solid' : 'outlined'}
                        sx={{ padding: '8px 16px' }} // เพิ่ม padding
                    >
                        ยาก
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ width: '600px', height: '600px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 0, border: 'none' }}>
                {board.map((value, index) => (
                    <Grid
                        key={index}
                        sx={{
                            display: 'flex', // ใช้ flexbox ในการจัดตำแหน่ง
                            justifyContent: 'center', // จัดให้อยู่กลางแนวนอน
                            alignItems: 'center', // จัดให้อยู่กลางแนวตั้ง
                            aspectRatio: '1 / 1', // ทำให้ช่องเป็นสี่เหลี่ยมจัตุรัส
                            fontSize: '3rem', // ขนาดตัวอักษรใหญ่ขึ้น
                            cursor: 'pointer',
                            backgroundColor: value === 'X' ? '#ffcccb' : value === 'O' ? '#add8e6' : '#fff', // สีพื้นหลังตามผู้เล่น
                            transition: 'background-color 0.3s ease', // เพิ่มการเปลี่ยนสีแบบนุ่มนวล
                            borderTop: index > 2 ? '2px solid black' : 'none', // เส้นคั่นด้านบน ถ้าไม่ใช่แถวแรก
                            borderLeft: index % 3 !== 0 ? '2px solid black' : 'none', // เส้นคั่นด้านซ้าย ถ้าไม่ใช่ช่องแรกในแต่ละแถว
                            '&:hover': {
                                backgroundColor: '#f0f0f0', // สีพื้นหลังเมื่อ hover
                            },
                        }}
                        onClick={() => handleClick(index)}
                    >
                        <Typography level="h1" sx={{ fontFamily: tictactoe.style.fontFamily, fontSize: '4rem' }}>{value}</Typography>
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
                    setBoard(Array(9).fill(null)); // รีเซ็ตกระดาน
                    setIsPlayerTurn(true); // ผู้เล่นเริ่มก่อนเสมอ
                    setPlayerScore(0); // รีเซ็ตคะแนนผู้เล่น
                    setWinner(null); // รีเซ็ตสถานะผู้ชนะ
                    setConsecutiveWins(0); // รีเซ็ตการนับชนะติดต่อกัน
                    updateScoreToDB(0);
                }}
            >
                รีเซ็ตเกมและคะแนน
            </Button>
        </Card>
    );
}

export default GameBoard;
