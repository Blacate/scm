import { createConnection, getConnection } from 'typeorm'
import { SshClient } from '../features/ssh_client/ssh_client.entity';

const initConnection = async () => {
  await createConnection({
    type: 'sqlite',
    database: '/tmp/scm.sqlite',
    entities: [SshClient],
    synchronize: true,
    
  })
    .catch(err => {
      console.log(err);
      process.exit();
    })
}

const closeConnection = async () => {
  const connection = getConnection()
  if (connection) {
    connection.close
  }
}

export {
  initConnection,
  closeConnection
}