import * as yargs from 'yargs';
import { SshClientService } from '../features/ssh_client/ssh_client.service';
import { UpdateSshClient } from '../features/ssh_client/interfaces/update_ssh_client.interface';
import { initConnection } from '../utils/handle_connection';

export class UpdateCommand implements yargs.CommandModule {
  private sshClientService: SshClientService;

  command = 'update';
  describe = 'Update one of the ssh client.';

  builder(argv: yargs.Argv) {
    return argv
      .middleware([initConnection, () => (this.sshClientService = new SshClientService())])
      .option('a', {
        alias: 'alias',
        describe: 'old ssh client alias',
        type: 'string',
        demand: true,
      })
      .option('r', {
        alias: 'rename',
        describe: 'new ssh client alias',
        type: 'string',
      })
      .option('s', {
        alias: 'server',
        describe: 'ssh client server',
        type: 'string',
      })
      .option('u', {
        alias: 'user',
        describe: 'ssh client user',
        type: 'string',
        default: 'root',
      })
      .option('p', {
        alias: 'port',
        describe: 'ssh client port',
        type: 'number',
        default: 22,
      })
      .option('c', {
        alias: 'category',
        describe: 'ssh client category',
        type: 'string',
      });
  }

  async handler(args: yargs.Arguments) {
    // todo add prompts
    const data: UpdateSshClient = {};
    if (args.rename) {
      data.alias = args.rename as string;
    }
    if (args.server) {
      data.server = args.server as string;
    }
    if (args.user) {
      data.user = args.user as string;
    }
    if (args.port) {
      data.port = args.port as number;
    }
    if (args.category) {
      data.category = args.category as string;
    }
    await this.sshClientService.update(args.alias as string, data);
  }
}
