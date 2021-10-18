import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn({name: 'id'})
  roleId: number;

  @Column({name: 'position_name'})
  positionName: string;

  @CreateDateColumn({name: 'create_time'})
  createTime: Date;

  @UpdateDateColumn({name: 'update_time'})
  updateTime: Date;
}
