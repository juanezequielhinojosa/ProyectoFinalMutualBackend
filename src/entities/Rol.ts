import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Usuario } from "./Usuario";
  
  @Entity() 

  export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_rol: string;

    @OneToOne(()=>Usuario, (usuario)=>usuario.rol)
    usuario:Usuario;
   
  }
