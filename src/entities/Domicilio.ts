import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Afiliado } from "./Afiliado";
import { Comercio } from "./Comercio";
  
  @Entity() 

  export class Domicilio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_domicilio: number;

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

    @OneToOne(()=>Comercio, (comercio)=>comercio.domicilio)
    comercio: Comercio;
   
  }
