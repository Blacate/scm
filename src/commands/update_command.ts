import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';

export class UpdateCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'update';
  describe = 'Update one of the ssh client.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware(() => this.sshClientService = new SshClientService)
  }
  
  async handler(args: yargs.Arguments) {
    console.log(await this.sshClientService.fetchAll())
  }
}
