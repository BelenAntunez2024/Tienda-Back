import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ItemOrden } from '../../item-ordenes/entities/item-ordene.entity';

@Entity({name: 'Producto'}) //asi supabase lo reconoce
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  id_producto: number;

  @Column({name: 'nombre', type: 'varchar', length: 100})
  nombre:string;
  @Column({name: 'precio', type: 'numeric', precision: 10, scale: 2}) //8 es la cantidad total de digitos, 2 es la cantidad de digitos despues del punto decimal: 8 enteros y 2 decimales
  precio:number;
  @Column({name: 'stock', type: 'int'})
  stock:number;

  @OneToMany(() => ItemOrden, itemOrden => itemOrden.producto)
  itemOrdenes: ItemOrden[];
}
