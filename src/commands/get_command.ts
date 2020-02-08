import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printItem } from '../utils/print';

export class GetCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'get';
  describe = 'Get one of the ssh clients.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware(() => (this.sshClientService = new SshClientService()))
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
      console.log(`Alias: ${args.alias} is not exist`);
    }
  }
}
