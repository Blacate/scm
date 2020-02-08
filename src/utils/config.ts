import { ConnectionOptions } from 'typeorm';
import { homedir } from 'os';
import { join, resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { printError } from './print';

let config: {
  db: ConnectionOptions;
};

const defaultConfig = `{
  "sqlite": {
    "type": "sqlite",
    "database": "~/.ssh/scm.sqlite",
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true
  },
  "mysql": {
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "1111",
    "database": "scm",
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true
  },
  "use": "sqlite"
}
`;

const getConfig = () => {
  if (config) return config;

  try {
    const configPath = join(homedir(), '.ssh/scm_sql_application.json');

    if (!existsSync(configPath)) {
      writeFileSync(configPath, defaultConfig, 'utf8');
    }

    // tslint:disable-next-line: no-var-requires
    const loadedConfig = require(configPath);

    const connectionOptions = loadedConfig[loadedConfig.use]

    // 修复sqlite中homedir为～的问题
    if (connectionOptions.type === 'sqlite') {
      connectionOptions.database = connectionOptions.database.replace(
        /^~/,
        homedir(),
      );
    }

    // 修复entities相对路径问题
    connectionOptions.entities = connectionOptions.entities.map((item: string) =>
      item.replace(/^dist/, resolve(__dirname, '..')),
    );

    // 解决connectionOptions中属性为readonly问题
    config = {
      db: connectionOptions,
    };
    return config;
  } catch (error) {
    printError(error);
    process.exit();
  }
};

export { getConfig };
