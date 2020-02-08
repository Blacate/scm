import { createConnection, getConnection } from 'typeorm';
import { homedir } from 'os';
import { join } from 'path';

// todo handle config

// tslint:disable-next-line: no-var-requires
const config = require(join(homedir(), '.ssh/node_scm.json'));

const initConnection = async () => {
  await createConnection(config.db).catch(err => {
    console.log(err);
    process.exit();
  });
};

const closeConnection = async () => {
  const connection = getConnection();
  if (connection && connection.isConnected) {
    await connection.close();
  }
};

export { initConnection, closeConnection };
