import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";


@Entity()
@Unique(['username']) //xử lí vấn đề bị trùng lặp username 
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username:string;

  @Column()
  password:string;
}