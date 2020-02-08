import * as yargs from 'yargs';
import { initConnection } from '../utils/handle_connection';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printItem } from '../utils/print';
import * as prompts from 'prompts';

export class AddCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'add';
  describe = 'Add a ssh client.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([
        initConnection,
        () => (this.sshClientService = new SshClientService()),
      ])
      .option('a', {
        alias: 'alias',
        describe: 'ssh client alias',
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
        default: 'root',
      })
      .option('p', {
        alias: 'port',
        describe: 'ssh client port',
        type: 'number',
        default: 22,
      })
      .option('c', {
        alias: 'category',
        describe: 'ssh client category',
        type: 'string',
        default: '',
      })
      .implies('a', 's');
  }

  async handler(args: yargs.Arguments) {
    const item = {
      alias: args.alias as string,
      server: args.server as string,
      user: args.user as string,
      port: args.port as number,
      category: args.category as string,
    };
    if (!item.alias || !item.server) {
      const { alias, server, user, port, category } = await prompts([
        {
          type: 'text',
          name: 'alias',
          message: 'Alias: ',
          initial: typeof item.alias === 'string' ? item.alias : '',
          validate: async clientName => {
            if (!clientName) {
              return 'Alias is must!';
            }
            return (await this.sshClientService.getByAlias(clientName))
              ? 'Already exist!'
              : true;
          },
        },
        {
          type: 'text',
          name: 'server',
          initial: typeof item.server === 'string' ? item.server : '',
          message: 'Server: ',
          validate: inputServer =>
            Boolean(inputServer) ? true : 'Server is must!',
        },
        {
          type: 'text',
          name: 'user',
          message: 'User: ',
          initial: 'root',
        },
        {
          type: 'number',
          name: 'port',
          message: 'Port: ',
          initial: 22,
        },
        {
          type: 'text',
          name: 'category',
          message: 'Category: ',
        },
      ]);
      await this.sshClientService.create({
        alias,
        server,
        port,
        user,
        category,
      });
    } else {
      const result = await this.sshClientService.create(item);
      printItem(result);
    }
  }
}
