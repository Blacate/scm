import { ClientService } from './client.service';
import { FileService } from './file.service';
const path = '/Users/blacate/workspace/.temp/.ssh';

const runFun = async () => {
  const fileService = new FileService(path);
  const clients = fileService.getClients();
  const clientService = new ClientService(clients);
  await clientService.create();
  fileService.updateClients(clientService.fetch());
  fileService.writeConfig();
};

export default runFun;
