import { ConnectionOptions } from 'typeorm';
import { homedir } from 'os';
import { join, resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { printError } from './print';

let config: {
  db: ConnectionOptions;
};

const defaultConfig = `{
  "db": {
    "type": "sqlite",
    "database": "~/.ssh/scm.sqlite",
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true
  },
  "mysqlDB": {
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "1111",
    "database": "scm",
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true
  }
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

    // 修复sqlite中homedir为～的问题
    if (loadedConfig.db.type === 'sqlite') {
      loadedConfig.db.database = loadedConfig.db.database.replace(
        /^~/,
        homedir(),
      );
    }

    // 修复entities相对路径问题
    loadedConfig.db.entities = loadedConfig.db.entities.map((item: string) =>
      item.replace(/^dist/, resolve(__dirname, '..')),
    );

    // 解决connectionOptions中属性为readonly问题
    config = loadedConfig;
    return config;
  } catch (error) {
    printError(error);
    process.exit();
  }
};

export { getConfig };
