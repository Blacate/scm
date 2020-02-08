import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printList } from '../utils/print';
import { initConnection } from '../utils/handle_connection';

export class SearchCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'search';
  describe = 'Search by keywords.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([initConnection, () => (this.sshClientService = new SshClientService())])
      .option('k', {
        alias: 'keyword',
        describe: 'search keyword',
        demand: true,
        type: 'string',
      });
  }

  async handler(args: yargs.Arguments) {
    const originKeyword = (args.keyword as string).trim();
    const keyword = /\*/.test(originKeyword)
      ? originKeyword.replace(/\*/g, '%')
      : `*${originKeyword}*`.replace(/\*/g, '%');
    const result = await this.sshClientService.search(keyword);
    printList(result);
  }
}
