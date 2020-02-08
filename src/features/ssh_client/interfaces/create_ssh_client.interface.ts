export interface CreateSshClient {
  alias: string;
  server: string;
  user?: string;
  port?: number;
  category?: string;
}
