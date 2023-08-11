import { Entity, 
  PrimaryGeneratedColumn, 
  JoinColumn, 
  CreateDateColumn, 
  ManyToOne, 
  BaseEntity, 
  Column} from "typeorm"
import { Orden } from "./Orden";

@Entity()
export class Cuota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_vencimiento: string;

  @Column({ type: 'float' })
  monto: number;
  
  @Column({ default: false })
  estado_pagado: boolean;

  @ManyToOne(() => Orden)
  @JoinColumn({name:'orden_id'})
  orden: Orden;
}