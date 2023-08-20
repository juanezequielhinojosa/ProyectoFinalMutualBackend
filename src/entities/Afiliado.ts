import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Domicilio } from "./Domicilio";
import { User } from "./User";
import { Orden } from "./Orden";
  
  @Entity() 

  export class Afiliado extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_afiliado: number;

    @Column()
    name: string;
  
    @Column()
    lastname: string;

    @Column()
    dni: number;

    @Column()
    birthdate: Date;

    @Column()
    phone: number;

    @Column()
    mail: string;

    @Column()
    cuil: number;

    @Column({ type: 'float' })
    saldo: number;
  
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
