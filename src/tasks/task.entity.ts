//tạo ra các bảng giống database

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task-status.enum";


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

}