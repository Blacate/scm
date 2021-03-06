import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printItem, printNotExist } from '../utils/print';
import { initConnection } from '../utils/handle_connection';

export class GetCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'get';
  describe = 'Get one of the ssh clients.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([
        initConnection,
        () => (this.sshClientService = new SshClientService()),
      ])
      .option('a', {
        alias: 'alias',
        describe: 'ssh client alias',
        demand: true,
      });
  }

  async handler(args: yargs.Arguments) {
    const result = await this.sshClientService.getByAlias(args.alias as string);
    if (result) {
      printItem(result);
    } else {
      printNotExist(args.alias as string);
    }
  }
}
