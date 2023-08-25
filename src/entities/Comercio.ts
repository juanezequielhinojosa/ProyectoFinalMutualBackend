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

    @Column({type: 'numeric', precision: 12})
    cuit: number;

    @Column({type: 'numeric', precision: 16})
    phone: number;

    @Column()
    barrio: string;
  
    @Column()
    calle: string;

    @Column({type: 'numeric', precision: 6})
    numero: number;

    @Column({type: 'text', nullable: true})
    nro_depto: string;

    @Column()
    localidad: string;

    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Orden, (orden)=>orden.comercio)
    orden: Orden[];

  ////////////////////////////////////////
   //Codigo de prueba de relacion uno a uno
   /*@OneToOne(() => Domicilio, (domicilio) => domicilio.comercio, {eager: true})
   domicilio: Domicilio;*/

   /* @OneToOne(() => Domicilio, (domicilio) => domicilio.comercio, { onDelete: "CASCADE", onUpdate: "CASCADE" })
   @JoinColumn({name:'domicilio_id'})
   domicilio : Domicilio;*/
  /////////////////////////////////////////

  }
