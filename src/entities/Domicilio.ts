import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Afiliado } from "./Afiliado";
  
  @Entity() 

  export class Domicilio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToOne(()=>Afiliado, (afiliado)=>afiliado.domicilio)
    afiliado: Afiliado;
   
  }
