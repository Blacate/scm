import * as yargs from 'yargs';
import { AddCommand } from './commands/add_command';
import { DeleteCommand } from './commands/delete_command';
import { GetCommand } from './commands/get_command';
import { ListCommand } from './commands/list_command';
import { SearchCommand } from './commands/search_command';
import { UpdateCommand } from './commands/update_command';
import { closeConnection, initConnection } from './utils/handle_connection';
import { SshClientService } from './features/ssh_client/ssh_client.service';

const main = async () => {
  await initConnection();
  // tslint:disable-next-line: no-unused-expression
  yargs
    .usage('Usage: $0 <command> [options]')
    .command(new AddCommand())
    .command(new DeleteCommand())
    .command(new GetCommand())
    .command(new ListCommand())
    .command(new SearchCommand())
    .command(new UpdateCommand())
    .demandCommand(1)
    .strict()
    .alias('v', 'version')
    .help('h')
    .alias('h', 'help')
    .onFinishCommand(async () => {
      await closeConnection();
    }).argv;
};

export { main };
