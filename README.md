# QuorielGame
Набор вспомогательных игровых функций для **ForgeScript**, это дополнение предоставляет готовые инструменты для реализации популярных мини-игр.

## Установка
```
npm i https://github.com/quoriel/game.git
```

## Подключение
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