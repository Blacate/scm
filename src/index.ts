import * as yargs from 'yargs';
import { InitCommand } from './commands/init_command';

const main = () => {
    yargs
    .usage("Usage: $0 <command> [options]")
    .command(new InitCommand())
    .demandCommand(1)
    .strict()
    .alias("v", "version")
    .help("h")
    .alias("h", "help")
    .argv;
}

export {
    main
}