import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Robot extends BaseEntity {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'app_key', nullable: true})
  appKey: string;

  @Column({name: 'app_secret', nullable: true})
  appSecret: string;

  @CreateDateColumn({name: 'create_time'})
  createTime: Date;

  @UpdateDateColumn({name: 'update_time'})
  updateTime: Date;
}
