import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';

export class DeleteCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'delete';
  describe = 'Delete one of the ssh client.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware(() => this.sshClientService = new SshClientService)
      .option('a', {
        alias: 'alias',
        describe: 'ssh client alias',
        demand: true,
      })
  }
  
  async handler(args: yargs.Arguments) {
    const result = await this.sshClientService.getByAlias(args.alias as string)
    if (result) {
      // todo: ensure
      await this.sshClientService.deleteByAlias(args.alias as string)
    } else {
      console.log(`Alias: ${args.alias} is not exist!`)
    }
  }
}
