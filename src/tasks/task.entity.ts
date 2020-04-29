//tạo ra các bảng giống database

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";



//tạo các bảng với khóa chính hihihi
//https://github.com/typeorm/typeorm/blob/master/docs/entities.md
@Entity()
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn() // khóa chính
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;


  @Column()
  userId: number;

}