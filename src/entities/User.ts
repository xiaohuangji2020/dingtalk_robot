import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({name: 'id'})
  userId: number;

  @Column({name: 'user_name'})
  userName: string;

  @Column({name: 'dingtalk_id', unique: true})
  dingtalkId: string;

  @Column({name: 'email', unique: true})
  email: string;

  @CreateDateColumn({name: 'create_time'})
  createTime: Date;

  @UpdateDateColumn({name: 'update_time'})
  updateTime: Date;
}
