import { createConnection, getConnection, ConnectionOptions } from 'typeorm';
import { getConfig } from './config';
import { printError } from './print';

const initConnection = async () => {
  await createConnection(getConfig().db).catch(err => {
    printError(err);
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
