const path = require('path');
const fs = require('fs/promises');

const pathToUsernames = path.join(__dirname, 'usernames.txt');
const newPath = path.join(__dirname, 'usernames.ts');

(async () => {
  const usernames = await fs.readFile(pathToUsernames, 'utf-8');
  const usernamesArray = usernames.split('\n');
  const usernamesTs = `export const usernames = ${JSON.stringify(usernamesArray)}`;
  await fs.writeFile(newPath, usernamesTs);
})();
