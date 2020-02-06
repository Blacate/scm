import * as yargs from 'yargs';
import { initConnection } from '../utils/handle_connection';
import { SshClientService } from '../features/ssh_client/ssh_client.service';

export class ListCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;
  constructor() {}

  command = 'list';
  describe = 'List all ssh clients.';

  builder(args: yargs.Argv) {
    return args
      .middleware(() => this.sshClientService = new SshClientService)
  }
  
  async handler(args:yargs.Arguments) {
    console.log(await this.sshClientService.fetchAll())
  }
}
