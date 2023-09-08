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
  id_orden: number;

 /* @Column()
  nro_orden: number;*/

  @Column({ type: 'float' })
  monto_credito: number;

  @Column({ type: 'float' })
  interes: number;

  /*@Column()
  cantidad_cuotas:number;*/
  
  @Column({ default: false })
  estado_pagado: boolean;

  @CreateDateColumn()
  fecha_solicitud: Date;

  /*@Column()
  fecha_vencimiento: Date;*/

  @Column({type: 'date', nullable: true})
  fecha_pago: Date;

  @ManyToOne(() => Afiliado)
  @JoinColumn({name:'id_afiliado'})
  afiliado: Afiliado;

  @ManyToOne(() => Comercio)
  @JoinColumn({name:'id_comercio'})
  comercio: Comercio;

  @OneToMany(() => Cuota, (cuota)=>cuota.orden)
  cuota: Cuota [];
  
}