import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
  
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
   
  }
