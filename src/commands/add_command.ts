import * as yargs from 'yargs';
import { initConnection } from '../utils/handle_connection';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printItem } from '../utils/print';

export class AddCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'add';
  describe = 'Add a ssh client.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([initConnection, () => (this.sshClientService = new SshClientService())])
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
      // todo use prompts
      console.log('alias and server is must');
      process.exit();
      const result = await this.sshClientService.create(item);
    } else {
      const result = await this.sshClientService.create(item);
      printItem(result);
    }
  }
}
