export interface ClientItem {
  hostname: string;
  user: string;
  port: number;
}

export interface Clients {
  [ClientName: string]: ClientItem;
}
