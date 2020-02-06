import * as yargs from 'yargs';

export class InitCommand implements yargs.CommandModule {
  command = 'init';
  describe = 'Test init command'

  builder(args: yargs.Argv) {
    return args
      .option('n', {
        alias: 'name',
        describe: 'Name of project'
      })
      .array('n')
  }
  
  async handler(args: yargs.Arguments) {
    console.log(args)
  }
}