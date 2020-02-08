import * as yargs from 'yargs';
import { initConnection } from '../utils/handle_connection';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printList } from '../utils/print';
import { SshClient } from '../features/ssh_client/ssh_client.entity';

export class ListCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'list';
  describe = 'List all ssh clients.';

  builder(argv: yargs.Argv) {
    return argv
    .middleware([initConnection, () => (this.sshClientService = new SshClientService())])
    .option('d', {
      alias: 'deleted',
      type: 'boolean',
      describe: 'List deleted ssh clients.'
    })
    .option('c', {
      alias: 'category',
      describe: 'List ssh clients by category.',
      type: 'string'
    })
  }

  async handler(args: yargs.Arguments) {
    let result: SshClient[];
    if (args.deleted) {
      result = await this.sshClientService.fetchDeleted();
    } else if (typeof args.category === 'string') {
      result = await this.sshClientService.getByCategory(args.category as string);
    } else {
      result = await this.sshClientService.fetchAll();
    }
    printList(result);
  }
}
