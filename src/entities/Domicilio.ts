import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Afiliado } from "./Afiliado";
import { Comercio } from "./Comercio";
  
  @Entity() 

  export class Domicilio extends BaseEntity {
    @PrimaryGeneratedColumn()
    domicilio_id: number;

    @Column()
    barrio: string;
  
    @Column()
    calle: string;

    @Column()
    numero: number;

    @Column()
    nro_depto: number

    @Column()
    localidad: string;

  //Codigo de prueba de relacion uno a uno 
   /* @OneToOne(() => Comercio, (comercio) => comercio.domicilio, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({name:'comercio'})
    comercio: Comercio;*/

   /*@OneToOne(() => Comercio, (comercio) => comercio.domicilio, {eager: true})
   comercio: Comercio;*/

  }
