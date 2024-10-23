export function getSmartMove(board, botSymbol, playerSymbol,difficulty) {
    const randomFactor = Math.random(); // สุ่มค่า 0 - 1 เพื่อควบคุมว่าบอทจะเล่นเก่งหรือไม่
    console.log(randomFactor,"randomFactor");
    console.log(difficulty,"difficulty");
    
    if (randomFactor < difficulty) {
        return getRandomMove(board);
    } else {
        const winningMove = findWinningMove(board, botSymbol);
        if (winningMove !== null) return winningMove;

        const blockingMove = findWinningMove(board, playerSymbol);
        if (blockingMove !== null) return blockingMove;

        if (board[4] === null) return 4;

        return getRandomMove(board);
    }
}

function findWinningMove(board, symbol) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // แนวนอน
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // แนวตั้ง
        [0, 4, 8], [2, 4, 6] // แนวทแยง
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === symbol && board[b] === symbol && board[c] === null) return c;
        if (board[a] === symbol && board[c] === symbol && board[b] === null) return b;
        if (board[b] === symbol && board[c] === symbol && board[a] === null) return a;
    }
    return null;
}

function getRandomMove(board) {
    const availableMoves = board.map((value, index) => value === null ? index : null).filter(index => index !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return randomMove;
}