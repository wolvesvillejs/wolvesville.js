## About
wolvesville.js is a [Node.js](https://nodejs.org) module to interact with the [Wolvesville API](https://api-docs.wolvesville.com).

- Website : https://wolvesvillejs.github.io/website
- NPM package : https://www.npmjs.com/package/wolvesville.js
- Discord server : https://discord.gg/C52jNDPemY

## Installation

**Latest version of Node.js required**
```sh-session
npm install wolvesville.js
```

## Example usage

Log the username and level of the player with username `Arnaud`:
```javascript
const Wolvesville = require('wolvesville.js');

const client = new Wolvesville.Client();
client.login('yourWolvesvileBotApiKey');

async function main() {
  const player = client.players.fetchByUsername('Arnaud');
  console.log(player.username, player.level);
}

main();
```