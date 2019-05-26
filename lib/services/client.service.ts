import { Clients } from '../interfaces/client.interface';
import * as prompts from 'prompts';

export class ClientService {
  // eslint-disable-next-line
  constructor(private clients: Clients) {}

  async create() {
    const { host, hostname, user, port } = await prompts([
      {
        type: 'text',
        name: 'host',
        message: 'Host: ',
        validate: clientName => (this.findOne(clientName) ? 'Already exist!' : true),
      },
      {
        type: 'text',
        name: 'hostname',
        message: 'HostName: ',
      },
      {
        type: 'text',
        name: 'user',
        message: 'User: ',
        initial: 'root',
      },
      {
        type: 'number',
        name: 'port',
        message: 'Port: ',
        initial: 22,
      },
    ]);
    if (!host || !hostname || !port || user) {
      throw new Error('Please enter full information!');
    }
    this.clients[host] = {
      hostname,
      user,
      port,
    };
  }

  findOne(host: string) {
    return this.clients[host];
  }

  fetch() {
    return this.clients;
  }

  print(host: string) {
    const clientItem = this.findOne(host);
    if (!this.findOne(host)) {
      return console.log(`Host: ${host} is not exist!`);
    }
    console.log(`Host: ${host}`);
    console.log(`HostName: ${clientItem.hostname}`);
    console.log(`User: ${clientItem.user}`);
    console.log(`Port: ${clientItem.port}`);
  }

  printAll() {
    this.printList(this.clients);
  }

  filterAndPrint(keywords: string) {
    const list: Clients = {};
    const hostArr = Object.keys(this.clients);
    hostArr.forEach(host => {
      if (host.includes(keywords)) {
        list[host] = this.clients[host];
      }
    });
    this.printList(list);
  }

  async delete(host: string) {
    if (!this.findOne(host)) {
      return console.log(`Host: ${host} is not exist!`);
    }
    this.print(host);
    const { value } = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Delete it?',
      initial: false,
    });
    if (value) {
      delete this.clients[host];
    }
  }

  async update(oldHost: string) {
    if (!this.findOne(oldHost)) {
      return console.log(`Host: ${oldHost} is not exist!`);
    }
    const clientItem = this.findOne(oldHost);
    delete this.clients[oldHost];
    const { host, hostname, user, port } = await prompts([
      {
        type: 'text',
        name: 'host',
        message: 'Host: ',
        validate: clinetName => (this.findOne(clinetName) ? 'Already exist!' : true),
        initial: oldHost,
      },
      {
        type: 'text',
        name: 'hostname',
        message: 'HostName: ',
        initial: clientItem.hostname,
      },
      {
        type: 'text',
        name: 'user',
        message: 'User: ',
        initial: clientItem.user,
      },
      {
        type: 'number',
        name: 'port',
        message: 'Port: ',
        initial: clientItem.port,
      },
    ]);
    if (!host || !hostname || !port || user) {
      throw new Error('Please enter full information!');
    }
    this.clients[host] = {
      hostname,
      user,
      port,
    };
  }

  private printList(list: Clients) {
    console.log('Host'.padEnd(20), 'HostName'.padEnd(20), 'User'.padEnd(10), 'Port'.padEnd(10));
    console.log('-'.repeat(60));
    const hostArr = Object.keys(list);
    hostArr.sort();
    hostArr.forEach(host => {
      const item = list[host];
      console.log(host.padEnd(20), item.hostname.padEnd(20), item.user.padEnd(10), item.port.toString().padEnd(10));
    });
  }

}
