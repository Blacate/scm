export interface CreateSshClient {
  alias: string;
  hostName: string;
  user?: string;
  port?: number;
}