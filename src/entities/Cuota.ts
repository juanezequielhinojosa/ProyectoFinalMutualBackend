import { Entity, 
  PrimaryGeneratedColumn, 
  JoinColumn, 
  CreateDateColumn, 
  ManyToOne, 
  BaseEntity, 
  Column,
  Collection,
  UpdateDateColumn} from "typeorm"
import { Orden } from "./Orden";

@Entity()
export class Cuota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cuota: number;

  @Column({ type: 'date' })
  fecha_vencimiento: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'float' })
  monto: number;

  @Column({type: 'date', nullable: true})
  fecha_pago: Date;
  
  @Column({ default: false })
  estado_pagado: boolean;

  @ManyToOne(() => Orden,(orden)=>orden.cuota)
  @JoinColumn({name:'id_orden'})
  orden: Orden;
}