import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { User } from "./User";
  
  @Entity() 

  export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column()
    name_rol: string;

    /*@OneToOne(()=>User, (user)=>user.rol)
    user:User;*/
    @OneToMany(()=>User, (user)=>user.rol)
    user:User;

  }
