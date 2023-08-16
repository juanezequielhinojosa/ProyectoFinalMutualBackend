import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Domicilio } from "./Domicilio";
import { User } from "./User";
import { Orden } from "./Orden";
  
  @Entity() 

  export class Comercio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    telefono: number

    @Column()
    cuit: number;
  
    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(()=>Domicilio)
    @JoinColumn({name: 'domicilio_id'})
    domicilio: Domicilio;

    @OneToMany(() => Orden, (orden)=>orden.comercio)
    orden: Orden[];

  }
