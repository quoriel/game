const { NativeFunction, ArgType } = require("@tryforge/forgescript");

exports.default = new NativeFunction({
    name: "$aiTicTacToe",
    version: "1.0.0",
    description: "Определяет лучший ход для ИИ (o), в игре крестики-нолики",
    output: ArgType.String,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Клетки",
            description: "9 значений поля (x, o, n)",
            type: ArgType.String,
            required: true,
            rest: true
        }
    ],
    execute(ctx, [cells]) {
        if (cells.length !== 9) {
            return this.success("f");
        }
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        const getEmptyIndices = (board) => board.map((val, idx) => val === 'n' ? idx : -1).filter(i => i !== -1);
        function checkWin(board, player) {
            return winConditions.some(([a, b, c]) => board[a] === player && board[b] === player && board[c] === player);
        }
        function isBoardFull(board) {
            return !board.includes('n');
        }
        function countForks(board, player) {
            let forkCount = 0;
            for (let [a, b, c] of winConditions) {
                if ((board[a] === player && board[b] === player && board[c] === 'n') ||
                    (board[a] === player && board[c] === player && board[b] === 'n') ||
                    (board[b] === player && board[c] === player && board[a] === 'n')) {
                    forkCount++;
                }
            }
            return forkCount;
        }
        function findForks(board, player) {
            const forks = [];
            for (const i of getEmptyIndices(board)) {
                board[i] = player;
                if (countForks(board, player) >= 2) forks.push(i);
                board[i] = 'n';
            }
            return forks;
        }
        function minimax(board, depth, isMaximizing, alpha, beta) {
            if (checkWin(board, 'o')) return 10 - depth;
            if (checkWin(board, 'x')) return depth - 10;
            if (isBoardFull(board)) return 0;
            const empty = getEmptyIndices(board);
            if (isMaximizing) {
                let best = -Infinity;
                for (const i of empty) {
                    board[i] = 'o';
                    best = Math.max(best, minimax(board, depth + 1, false, alpha, beta));
                    board[i] = 'n';
                    alpha = Math.max(alpha, best);
                    if (beta <= alpha) break;
                }
                return best;
            } else {
                let best = Infinity;
                for (const i of empty) {
                    board[i] = 'x';
                    best = Math.min(best, minimax(board, depth + 1, true, alpha, beta));
                    board[i] = 'n';
                    beta = Math.min(beta, best);
                    if (beta <= alpha) break;
                }
                return best;
            }
        }
        function bestMove() {
            for (const i of getEmptyIndices(cells)) {
                cells[i] = 'o';
                if (checkWin(cells, 'o')) return i;
                cells[i] = 'n';
            }
            for (const i of getEmptyIndices(cells)) {
                cells[i] = 'x';
                if (checkWin(cells, 'x')) return i;
                cells[i] = 'n';
            }
            const userFirstMove = [1, 3, 5, 7];
            if (userFirstMove.some(i => cells[i] === 'x') && cells[4] === 'n') return 4;
            if (cells[4] === 'x') {
                for (const i of [0, 2, 6, 8]) {
                    if (cells[i] === 'n') return i;
                }
            }
            const forks = findForks(cells, 'o');
            if (forks.length) return forks[Math.floor(Math.random() * forks.length)];
            let bestScore = -Infinity, move = null;
            for (const i of getEmptyIndices(cells)) {
                cells[i] = 'o';
                let score = minimax(cells, 0, false, -Infinity, Infinity);
                cells[i] = 'n';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
            return move;
        }
        return this.success(bestMove());
    }
});