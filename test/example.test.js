require('dotenv').config();
const Wolvesville = require('../src');

const client = new Wolvesville.Client();

async function main() {
  const player = await client.players.fetch('Arnaud');
  console.log(player.username, player.level);
}

main();