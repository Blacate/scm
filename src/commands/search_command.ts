import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';

export class SearchCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'search';
  describe = 'Search by keywords.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware(() => this.sshClientService = new SshClientService)
  }
  
  async handler(args: yargs.Arguments) {
    console.log(await this.sshClientService.fetchAll())
  }
}
