import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class ActionViewProject extends BaseEntity {

  @PrimaryGeneratedColumn({name: 'id'})
  actionViewProjectId: number;

  // 对应action view里的id
  @Column({name: 'code'})
  code: string;

  @Column({name: 'key'})
  key: string;

  @Column({name: 'name'})
  name: string;

  @CreateDateColumn({name: 'create_time'})
  createTime: Date;

  @UpdateDateColumn({name: 'update_time'})
  updateTime: Date;
}
