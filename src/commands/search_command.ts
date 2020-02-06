import * as yargs from 'yargs';

export class SearchCommand implements yargs.CommandModule {
  command = 'search';
  describe = 'Search by keywords.';

  builder(args: yargs.Argv) {
    return args
  }
  
  async handler(args:yargs.Arguments) {
    
  }
}
