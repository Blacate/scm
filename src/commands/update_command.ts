import * as yargs from 'yargs';

export class UpdateCommand implements yargs.CommandModule {
  command = 'update';
  describe = 'Update one of the ssh client.';

  builder(args: yargs.Argv) {
    return args
  }
  
  async handler(args:yargs.Arguments) {
    
  }
}
