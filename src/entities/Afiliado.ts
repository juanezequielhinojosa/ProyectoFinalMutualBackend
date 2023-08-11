import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Domicilio } from "./Domicilio";
import { Usuario } from "./Usuario";
import { Orden } from "./Orden";
  
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
    telefono: number;

    @Column()
    correo: string;

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

    @OneToOne(()=>Domicilio)
    @JoinColumn({name: 'domicilio_id'})
    domicilio: Domicilio;

    @OneToOne(()=>Usuario)
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario;

    @OneToMany(() => Orden, (orden)=>orden.afiliado)
    orden: Orden[];
      
  }
