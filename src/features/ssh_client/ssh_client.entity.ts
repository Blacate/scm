import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class SshClient {
  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: 'ID',
  })
  id: number;

  @Column({
    length: 45,
    nullable: false,
    comment: '别名',
  })
  @Index({
    unique: true,
  })
  alias: string;

  @Column({
    name: 'host_name',
    nullable: false,
    comment: '主机名',
  })
  server: string;

  @Column({
    default: '',
    length: 100,
    comment: '类别',
  })
  category: string;

  @Column({
    length: 45,
    default: 'root',
    comment: '用户名',
  })
  user: string;

  @Column({
    type: 'int',
    default: '22',
    comment: '端口',
  })
  port: number;

  @Column({
    default: false,
    name: 'is_deleted',
    comment: '是否删除',
  })
  isDeleted: boolean;
}
