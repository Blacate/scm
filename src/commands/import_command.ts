import * as yargs from 'yargs';
import { initConnection } from '../utils/handle_connection';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { printItem, printList } from '../utils/print';
import { join } from 'path';
import { homedir } from 'os';

export class ImportCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'import';
  describe = 'Import config from old node-scm.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([
        initConnection,
        () => (this.sshClientService = new SshClientService()),
      ])
      .option('path', {
        describe: 'old config path',
        type: 'string',
      });
  }

  async handler(args: yargs.Arguments) {
    try {
      const path = (args.path as string) || join(homedir(), '.ssh/scm.json');
      const data = require(path);
      if (data && data.clients) {
        for (const [host, item] of Object.entries<{
          hostname: string;
          user: string;
          port: number;
        }>(data.clients)) {
          await this.sshClientService.create({
            alias: host,
            server: item.hostname,
            user: item.user,
            port: item.port,
          });
        }
      }
      printList(await this.sshClientService.fetchAll());
    } catch (e) {
      console.log(e);
    }
  }
}
