import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany, Long} from "typeorm";
import { Domicilio } from "./Domicilio";
import { User } from "./User";
import { Orden } from "./Orden";
import { text } from "stream/consumers";
  
  @Entity() 

  export class Afiliado extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_afiliado: number;

    @Column()
    name: string;
  
    @Column()
    lastname: string;

    @Column()
    birthdate: Date;

    @Column({type: 'numeric', precision: 8})
    dni: number;

    @Column({type: 'numeric', precision: 12})
    cuil: number;

    @Column({type: 'numeric', precision: 16})
    phone: number;

    @Column()
    mail: string;

    @Column({ type: 'float' })
    saldo: number;

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

    @OneToOne(()=>User)
    @JoinColumn({name: 'id_user'})
    user: User;

    /*@OneToMany(() => Orden, (orden)=>orden.afiliado)
    orden: Orden[];*/

    /*@OneToOne(()=>Domicilio)
    @JoinColumn({name: 'domicilio_id'})
    domicilio: Domicilio;*/
      
  }
