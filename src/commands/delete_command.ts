import * as yargs from 'yargs';

export class DeleteCommand implements yargs.CommandModule {
  command = 'delete';
  describe = 'Delete one of the ssh client.';

  builder(args: yargs.Argv) {
    return args
  }
  
  async handler(args:yargs.Arguments) {
    
  }
}
