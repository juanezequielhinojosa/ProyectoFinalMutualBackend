import { Entity, 
  PrimaryGeneratedColumn, 
  JoinColumn, 
  CreateDateColumn, 
  ManyToOne, 
  BaseEntity, 
  Column,
  OneToMany} from "typeorm"
import { Afiliado } from "./Afiliado";
import { Comercio } from "./Comercio";
import { Cuota } from "./Cuota";

@Entity()
export class Orden extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nro_orden: number;

  @Column({ type: 'float' })
  monto_credito: number;
  
  @Column({ default: false })
  estado_pagado: boolean;

  @CreateDateColumn()
  fecha_solicitud: Date;

  @ManyToOne(() => Afiliado)
  @JoinColumn({name:'afiliado_id'})
  afiliado: Afiliado;

  @ManyToOne(() => Comercio)
  @JoinColumn({name:'id_comercio'})
  comercio: Comercio;

  @OneToMany(() => Cuota, (cuota)=>cuota.orden)
  cuota: Cuota[];
}