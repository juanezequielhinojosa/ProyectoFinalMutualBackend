import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Domicilio } from "./Domicilio";
import { User } from "./User";
import { Orden } from "./Orden";
  
  @Entity() 

  export class Comercio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_comercio: number;

    @Column()
    name: string;

    @Column()
    cuit: number

    @Column()
    phone: number;
  
    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(()=>Domicilio)
    @JoinColumn({name: 'id_domicilio'})
    domicilio: Domicilio;

    @OneToMany(() => Orden, (orden)=>orden.comercio)
    orden: Orden[];

  }
