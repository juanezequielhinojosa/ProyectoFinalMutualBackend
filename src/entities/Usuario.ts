 import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { Rol } from "./Rol";
import { Afiliado } from "./Afiliado";

  
  @Entity() 
  export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;

    @OneToOne(()=>Rol)
    @JoinColumn({name: 'rol_id'})
    rol:Rol;

    @OneToOne(()=>Afiliado, (afiliado)=>afiliado.usuario)
    afiliado: Afiliado;
}
