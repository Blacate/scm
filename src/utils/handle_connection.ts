import { createConnection, getConnection, ConnectionOptions } from 'typeorm';
import { getConfig } from './config';

const initConnection = async () => {
  await createConnection(getConfig().db).catch(err => {
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
