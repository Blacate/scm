// eslint-disable-next-line no-unused-vars
import { OnModuleInit } from '../interfaces/on_module_init.interface';
import { Clients } from '../interfaces/client.interface';
import { ScmConfig } from '../interfaces/file.interface';
import { readFileSync, writeFileSync, existsSync, renameSync } from 'fs';
import { join } from 'path';
import * as isJson from 'is-json';
import * as prompts from 'prompts';

const defaultConfig = {
  clients: {},
};

export class FileService implements OnModuleInit {
  private scmConfig: ScmConfig;
  private configPath: string;
  private sshConfigPath: string;
  constructor(private configDir: string) {
    this.configPath = join(configDir, 'scm.json');
    this.sshConfigPath = join(configDir, 'config');
  }

  async onModuleInit() {
    if (!existsSync(this.configPath)) {
      // 不存在
      const { needInit } = await prompts({
        type: 'confirm',
        name: 'needInit',
        message: 'Config is not exist, init it?',
        initial: true,
      });
      if (needInit) {
        this.scmConfig = defaultConfig;
      } else {
        throw new Error('Config is not exist!');
      }
    } else {
      // 存在
      const file = readFileSync(this.configPath, {
        encoding: 'utf8',
      });
      if (isJson(file)) {
        this.scmConfig = JSON.parse(file);
      } else {
        // 如果不是json
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: 'Parsing failed, overwrite it?',
          initial: 'false',
        });
        // 覆写
        if (overwrite) {
          const bakFile = join(this.configDir, `scm.json.${Date.now()}`);
          console.log(`File backup in ${bakFile}`);
          renameSync(this.configPath, bakFile);
          this.scmConfig = defaultConfig;
        } else {
          throw new Error(`Pasing filed, please check file ${this.configPath}`);
        }
      }
    }
  }

  getClients() {
    return this.scmConfig.clients;
  }

  updateClients(clients: Clients) {
    this.scmConfig.clients = clients;
  }

  writeConfig() {
    // scm config
    writeFileSync(this.configPath, JSON.stringify(this.scmConfig, null, 4), 'utf8');
    // ssh config
    writeFileSync(this.sshConfigPath, this.generateSshConfig(), 'utf8');
  }

  private generateSshConfig() {
    const hostArr = Object.keys(this.scmConfig.clients);
    const clientArr = hostArr.map(host => {
      const item = this.scmConfig.clients[host];
      return `Host ${host}\n    HostName ${item.hostname}\n    User ${item.user}\n    Port ${item.port}\n`;
    });
    return clientArr.join('\n');
  }

}
