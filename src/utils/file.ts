import { existsSync, writeFileSync, readFileSync, appendFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { SshClient } from '../features/ssh_client/ssh_client.entity';
import { getConnection } from 'typeorm';
import { SshClientService } from '../features/ssh_client/ssh_client.service';

const baseDir = join(homedir(), '.ssh');

const sshConfigPath = join(baseDir, 'config');
const scmConfigPath = join(baseDir, 'scm_config');

const setSshConfigInclude = () => {
  if (!existsSync(sshConfigPath)) {
    return writeFileSync(sshConfigPath, '\nInclude scm_config\n');
  }
  const content = readFileSync(sshConfigPath, {
    encoding: 'utf8',
  });
  const reg = /Include scm_config/;
  if (!reg.test(content)) {
    appendFileSync(sshConfigPath, '\nInclude scm_config\n');
  }
};

const generateScmConfig = (sshClients: SshClient[]) => {
  const clientArr = sshClients.map(sshClient => {
    return `Host ${sshClient.alias}\n    HostName ${sshClient.server}\n    User ${sshClient.user}\n    Port ${sshClient.port}\n`;
  });
  return clientArr.join('\n');
};

const writeConfig = async () => {
  const connection = getConnection();
  if (connection && connection.isConnected) {
    const sshClientService = new SshClientService();
    setSshConfigInclude();
    writeFileSync(
      scmConfigPath,
      generateScmConfig(await sshClientService.fetchAll()),
      'utf8',
    );
  }
};

export { writeConfig };
