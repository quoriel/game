# QuorielGame
A collection of helper game functions for ForgeScript, offering ready-made tools for creating popular mini-games.

## Installation
```
npm i github:quoriel/game
```

## Connection
```js
const { ForgeClient } = require("@tryforge/forgescript");
const { QuorielGame } = require("@quoriel/game");

const client = new ForgeClient({
    extensions: [
        new QuorielGame()
    ]
});

client.login("...");
```