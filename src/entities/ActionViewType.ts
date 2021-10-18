import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class ActionViewType extends BaseEntity {

  @PrimaryGeneratedColumn({name: 'id'})
  actionViewTypeId: number;

  @Column({name: 'project_key'})
  projectKey: string;

  // 对应action view里的id
  @Column({name: 'code'})
  code: string;

  @Column({name: 'name'})
  name: string;

  // 1. 需要提示   0. 关闭提示
  @Column({name: 'open', nullable: true, default: 0})
  open: number;

  @CreateDateColumn({name: 'create_time'})
  createTime: Date;

  @UpdateDateColumn({name: 'update_time'})
  updateTime: Date;
}
