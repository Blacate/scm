import { Clients } from './interfaces/client.interface';
import { ScmConfig } from './interfaces/file.interface';
import { readFileSync, writeFileSync } from 'fs';

export class FileService {
  private scmConfig: ScmConfig;
  private configPath: string;
  private sshConfigPath: string;
  constructor(configDir: string) {
    this.configPath = `${configDir}/scm.json`;
    this.sshConfigPath = `${configDir}/config`;
    const file = readFileSync(this.configPath, {
      encoding: 'utf8',
    });
    try {
      this.scmConfig = JSON.parse(file);
    } catch (e) {
      throw new Error(`File ${this.configPath} cannot be parsed!`);
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
