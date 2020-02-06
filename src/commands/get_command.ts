import * as yargs from 'yargs';

export class GetCommand implements yargs.CommandModule {
  command = 'get';
  describe = 'Get one of the ssh clients.';

  builder(args: yargs.Argv) {
    return args
  }
  
  async handler(args:yargs.Arguments) {
    
  }
}
