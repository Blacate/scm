import { Clients } from './interfaces/client.interface';
import { ClientService } from './client.service';

const data: Clients = {
  b: {
    hostname: 'b.example.com',
    user: 'root',
    port: 22,
  },
};

const runFun = async () => {
  const clientService = new ClientService(data);
  clientService.printAll(); // 打印所有
  console.log();
  await clientService.create(); // 添加
  console.log();
  clientService.print('b'); // 打印单个
  console.log();
  await clientService.update('b'); // 更新
  console.log();
  clientService.printAll(); // 打印所有
  console.log();
  await clientService.delete('b');
  console.log();
  clientService.printAll();
};

export default runFun;
