import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { UpdateSshClient } from '../features/ssh_client/interfaces/update_ssh_client.interface';
import { initConnection } from '../utils/handle_connection';
import * as prompts from 'prompts';

export class UpdateCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'update';
  describe = 'Update one of the ssh client.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([
        initConnection,
        () => (this.sshClientService = new SshClientService()),
      ])
      .option('a', {
        alias: 'alias',
        describe: 'old ssh client alias',
        type: 'string',
        demand: true,
      })
      .option('r', {
        alias: 'rename',
        describe: 'new ssh client alias',
        type: 'string',
      })
      .option('s', {
        alias: 'server',
        describe: 'ssh client server',
        type: 'string',
      })
      .option('u', {
        alias: 'user',
        describe: 'ssh client user',
        type: 'string',
      })
      .option('p', {
        alias: 'port',
        describe: 'ssh client port',
        type: 'number',
      })
      .option('c', {
        alias: 'category',
        describe: 'ssh client category',
        type: 'string',
      });
  }

  async handler(args: yargs.Arguments) {
    const oldSshClient = await this.sshClientService.getByAlias(
      args.alias as string,
    );
    if (!oldSshClient) {
      console.log(`Alias: ${args.alias} is not exist.`);
      return;
    }
    const data: UpdateSshClient = {};
    let promptsFlag = true;
    if (args.rename) {
      promptsFlag = false;
      data.alias = args.rename as string;
    }
    if (args.server) {
      promptsFlag = false;
      data.server = args.server as string;
    }
    if (args.user) {
      promptsFlag = false;
      data.user = args.user as string;
    }
    if (args.port) {
      promptsFlag = false;
      data.port = args.port as number;
    }
    if (args.category) {
      promptsFlag = false;
      data.category = args.category as string;
    }
    if (promptsFlag) {
      const promptsData = await prompts([
        {
          type: 'text',
          name: 'alias',
          message: 'Alias: ',
          initial: oldSshClient.alias,
          validate: async clientName => {
            if (oldSshClient.alias !== clientName) {
              return (await this.sshClientService.getByAlias(clientName))
                ? 'Already exist!'
                : true;
            }
            return true;
          },
        },
        {
          type: 'text',
          name: 'server',
          initial: oldSshClient.server,
          message: 'Server: ',
        },
        {
          type: 'text',
          name: 'user',
          message: 'User: ',
          initial: oldSshClient.user,
        },
        {
          type: 'number',
          name: 'port',
          message: 'Port: ',
          initial: oldSshClient.port,
        },
        {
          type: 'text',
          name: 'category',
          message: 'Category: ',
          initial: oldSshClient.category,
        },
      ]);
      Object.assign(data, promptsData);
    }
    await this.sshClientService.update(args.alias as string, data);
  }
}
