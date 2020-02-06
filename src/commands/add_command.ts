import * as yargs from 'yargs';
import { initConnection } from '../utils/handle_connection'

export class AddCommand implements yargs.CommandModule {
  command = 'add';
  describe = 'Add a ssh client.';

  builder(args: yargs.Argv) {
    return args
        .middleware(initConnection)
  }
  
  async handler(args:yargs.Arguments) {
    
  }
}
