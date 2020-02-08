import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { initConnection } from '../utils/handle_connection';
import { printItem } from '../utils/print';
import * as prompts from 'prompts';

export class DeleteCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'delete';
  describe = 'Delete one of the ssh client.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([initConnection, () => (this.sshClientService = new SshClientService())])
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
      const { value } = await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Delete it?',
        initial: false,
      });
      if (value) {
        await this.sshClientService.deleteByAlias(args.alias as string);
      }
    } else {
      console.log(`Alias: ${args.alias} is not exist!`);
    }
  }
}
