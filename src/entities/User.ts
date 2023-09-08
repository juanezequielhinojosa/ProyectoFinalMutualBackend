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
    ManyToOne,
  } from "typeorm";
import { Rol } from "./Rol";
import { Afiliado } from "./Afiliado";

  
  @Entity() 
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;

    /*@OneToOne(()=>Rol)
    @JoinColumn({name: 'rol_id'})
    rol:Rol;*/
    @ManyToOne(()=>Rol)
    @JoinColumn({name: 'id_rol'})
    rol:Rol;
    

    @OneToOne(()=>Afiliado, (afiliado)=>afiliado.user)
    afiliado: Afiliado;
}
