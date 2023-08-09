import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
  
  @Entity() 

  export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_rol: string;
   
  }
