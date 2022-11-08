require('dotenv').config();
const Wolvesville = require('../src');

const client = new Wolvesville.Client();
client.login();

async function main() {
  const player = await client.players.fetchByUsername('Arnaud');
  console.log(player.avatars);
}

main();