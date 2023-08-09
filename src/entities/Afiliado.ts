import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
  
  @Entity() 

  export class Afiliado extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
  
    @Column()
    apellido: string;

    @Column()
    dni: number;

    @Column()
    fecha_nacimiento: Date;

    @Column()
    telefono: number

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

   
  }
