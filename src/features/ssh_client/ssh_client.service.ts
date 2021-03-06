import { getConnection, Repository, Like } from 'typeorm';
import { SshClient } from './ssh_client.entity';
import { CreateSshClient } from './interfaces/create_ssh_client.interface';
import { UpdateSshClient } from './interfaces/update_ssh_client.interface';
import { printExist } from '../../utils/print';

export class SshClientService {
  private readonly sshClientRepository: Repository<SshClient>;

  constructor() {
    this.sshClientRepository = getConnection().getRepository(SshClient);
  }

  async fetchAll() {
    return await this.sshClientRepository.find({
      where: {
        isDeleted: false,
      },
      order: {
        category: 'ASC',
        alias: 'ASC',
      },
    });
  }

  async fetchDeleted() {
    return await this.sshClientRepository.find({
      where: {
        isDeleted: true,
      },
      order: {
        category: 'ASC',
        alias: 'ASC',
      },
    });
  }

  async getByAlias(alias: string) {
    return await this.sshClientRepository.findOne({
      where: {
        alias,
        isDeleted: false,
      },
    });
  }

  async getByCategory(category: string) {
    return await this.sshClientRepository.find({
      where: {
        category,
        isDeleted: false,
      },
    });
  }

  async deleteByAlias(alias: string) {
    await this.sshClientRepository.update(
      {
        alias,
      },
      {
        isDeleted: true,
        alias: `${alias}_${Date.now()}`,
      },
    );
  }

  async search(keywords: string) {
    return await this.sshClientRepository.find({
      where: {
        isDeleted: false,
        alias: Like(keywords),
      },
    });
  }

  async create(createSshClient: CreateSshClient) {
    if (await this.getByAlias(createSshClient.alias)) {
      printExist(createSshClient.alias);
      return;
    }
    const sshClient = this.sshClientRepository.create(createSshClient);
    return await this.sshClientRepository.save(sshClient);
  }

  async update(oldAlias: string, updateSshClient: UpdateSshClient) {
    const sshClient = await this.getByAlias(oldAlias);
    return await this.sshClientRepository.save(
      Object.assign(sshClient, updateSshClient),
    );
  }
}
