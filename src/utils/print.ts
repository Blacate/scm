// tslint:disable: no-console
import { SshClient } from '../features/ssh_client/ssh_client.entity';

const printItem = (sshClient: SshClient) => {
  console.log(`Alias: ${sshClient.alias}`);
  console.log(`Server: ${sshClient.server}`);
  console.log(`User: ${sshClient.user}`);
  console.log(`Port: ${sshClient.port}`);
  console.log(`Category: ${sshClient.category}`);
};

const printList = (sshClients: SshClient[]) => {
  const maxLength = {
    alias: 5,
    server: 8,
    user: 4,
    port: 4,
    category: 8,
  };
  sshClients.forEach(sshClient => {
    maxLength.alias = Math.max(maxLength.alias, sshClient.alias.length);
    maxLength.server = Math.max(maxLength.server, sshClient.server.length);
    maxLength.user = Math.max(maxLength.user, sshClient.user.length);
    maxLength.port = Math.max(maxLength.port, String(sshClient.port).length);
    maxLength.category = Math.max(
      maxLength.category,
      sshClient.category.length,
    );
  });
  const aliasLength = maxLength.alias + 4;
  const serverLength = maxLength.server + 4;
  const userLength = maxLength.user + 4;
  const portLength = maxLength.port + 4;
  const categoryLength = maxLength.category + 4;
  console.log(
    'Alias'.padEnd(aliasLength),
    'Category'.padEnd(categoryLength),
    'Server'.padEnd(serverLength),
    'User'.padEnd(userLength),
    'Port'.padEnd(portLength),
  );
  console.log(
    '-'.repeat(
      aliasLength +
        categoryLength +
        userLength +
        portLength +
        categoryLength +
        15,
    ),
  );
  sshClients.forEach(sshClient => {
    console.log(
      sshClient.alias.padEnd(aliasLength),
      sshClient.category.padEnd(categoryLength),
      sshClient.server.padEnd(serverLength),
      sshClient.user.padEnd(userLength),
      sshClient.port.toString().padEnd(portLength),
    );
  });
};

const printNotExist = (alias: string) => {
  console.log(`Alias: ${alias} is not exist!`);
};

const printExist = (alias: string) => {
  console.log(`Alias: ${alias} is exist.`);
};

const printError = err => {
  console.log(err);
};

export { printItem, printList, printNotExist, printError, printExist };
