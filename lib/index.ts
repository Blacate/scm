import { ClientService } from './services/client.service';
import { FileService } from './services/file.service';
import * as program from 'commander';
import { join } from 'path';
import { homedir } from 'os';

const path = join(homedir(), '.ssh');

const scm = async () => {
  program
    .version(require('../package').version)
    .usage('<command> [host] [options]')
    .command('list', 'List all ssh clients')
    .command('find <host>', 'Find one of the ssh clients')
    .command('add', 'Add a ssh client')
    .command('update <host>', 'Update one of the ssh client')
    .command('delete <host>', 'Delete one of the ssh client')
    .parse(process.argv);
};

const scmList = async () => {
  // 读取配置文件
  const fileService = new FileService(path);
  const clients = fileService.getClients();
  const clientService = new ClientService(clients);
  // 解析命令 todo
  program
    .version(require('../package').version)
    .description('List all ssh clients')
    .parse(process.argv);
  clientService.printAll();
};

const scmFind = async () => {
  // 读取配置文件
  const fileService = new FileService(path);
  const clients = fileService.getClients();
  const clientService = new ClientService(clients);
  // 解析命令 todo
  program
    .version(require('../package').version)
    .usage('<host>')
    .description('Find one of the ssh client')
    .parse(process.argv);
  if (!program.args[0]) {
    return program.outputHelp();
  }
  clientService.print(program.args[0]);
};

const scmAdd = async () => {
  // 读取配置文件
  const fileService = new FileService(path);
  const clients = fileService.getClients();
  const clientService = new ClientService(clients);
  // 解析命令 todo
  program
    .version(require('../package').version)
    .description('Add a ssh client')
    .parse(process.argv);
  await clientService.create();
  // 保存配置文件
  fileService.updateClients(clientService.fetch());
  fileService.writeConfig();
};

const scmUpdate = async () => {
  // 读取配置文件
  const fileService = new FileService(path);
  const clients = fileService.getClients();
  const clientService = new ClientService(clients);
  // 解析命令 todo
  program
    .version(require('../package').version)
    .usage('<host>')
    .description('Update one of the ssh client')
    .parse(process.argv);
  if (!program.args[0]) {
    return program.outputHelp();
  }
  await clientService.update(program.args[0]);
  // 保存配置文件
  fileService.updateClients(clientService.fetch());
  fileService.writeConfig();
};

const scmDelete = async () => {
  // 读取配置文件
  const fileService = new FileService(path);
  const clients = fileService.getClients();
  const clientService = new ClientService(clients);
  // 解析命令 todo
  program
    .version(require('../package').version)
    .usage('<host>')
    .description('Delete one of the ssh client')
    .parse(process.argv);
  if (!program.args[0]) {
    return program.outputHelp();
  }
  await clientService.delete(program.args[0]);
  // 保存配置文件
  fileService.updateClients(clientService.fetch());
  fileService.writeConfig();
};

export {
  scm,
  scmList,
  scmAdd,
  scmUpdate,
  scmFind,
  scmDelete,
};
