import * as yargs from 'yargs';
import { initConnection } from '../utils/handle_connection';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printList } from '../utils/print';

export class ListCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'list';
  describe = 'List all ssh clients.';

  builder(argv: yargs.Argv) {
    return argv.middleware(
      () => (this.sshClientService = new SshClientService()),
    );
  }

  async handler(args: yargs.Arguments) {
    // todo --deleted --category
    const result = await this.sshClientService.fetchAll();
    printList(result);
  }
}
