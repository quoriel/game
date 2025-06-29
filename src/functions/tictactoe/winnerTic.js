const { NativeFunction, ArgType } = require("@tryforge/forgescript");

exports.default = new NativeFunction({
    name: "$winnerTic",
    version: "1.0.0",
    description: "Determines the winner of the game of tic-tac-toe",
    output: ArgType.String,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Cells",
            description: "9 field values (x, o, n)",
            type: ArgType.String,
            required: true,
            rest: true
        }
    ],
    execute(ctx, [cells]) {
        if (cells.length !== 9) {
            return this.success("f");
        }
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of wins) {
            const first = cells[a];
            if (first !== "n" && first === cells[b] && first === cells[c]) {
                return this.success(first);
            }
        }
        if (cells.includes("n")) {
            return this.success("n");
        }
        return this.success("d");
    }
});