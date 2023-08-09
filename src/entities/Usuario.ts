 import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";

  
  @Entity() 
  export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
}
